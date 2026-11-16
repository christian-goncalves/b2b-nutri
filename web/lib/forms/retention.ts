type RetentionSheets = {
  verifyHeaders(sheet: "Contato", expected: string[]): Promise<void>;
  contactsForRetention(): Promise<Array<{ row: number; resolvedAt: string }>>;
  anonymizeContact(row: number): Promise<void>;
};

const CONTACT_HEADERS = ["nome", "email", "assunto", "mensagem", "data_hora", "resolvido_em"];

function addCalendarYear(value: Date): Date {
  const year = value.getUTCFullYear() + 1;
  const month = value.getUTCMonth();
  const day = value.getUTCDate();
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return new Date(Date.UTC(year, month, Math.min(day, lastDay), value.getUTCHours(), value.getUTCMinutes(), value.getUTCSeconds(), value.getUTCMilliseconds()));
}

export async function anonymizeResolvedContacts(sheets: RetentionSheets, now = new Date()): Promise<number> {
  await sheets.verifyHeaders("Contato", CONTACT_HEADERS);
  const rows = await sheets.contactsForRetention();
  let anonymized = 0;
  for (const entry of rows) {
    const resolvedAt = new Date(entry.resolvedAt);
    if (!Number.isFinite(resolvedAt.getTime()) || addCalendarYear(resolvedAt) > now) continue;
    await sheets.anonymizeContact(entry.row);
    anonymized++;
  }
  return anonymized;
}
