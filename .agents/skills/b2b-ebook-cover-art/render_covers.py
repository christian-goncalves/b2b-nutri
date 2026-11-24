#!/usr/bin/env python3
"""Montar capas B2B Nutris. Dependência: Pillow.

Exemplo (após aprovar o título e consultar HomeBook.coverCollection):
python3 .agents/skills/b2b-ebook-cover-art/render_covers.py \
  --photo foto1.png --photo foto2.png --logo web/public/images/logo.png \
  --body-font .agents/skills/b2b-ebook-cover-art/assets/fonts/Inter-Regular.ttf \
  --title-font .agents/skills/b2b-ebook-cover-art/assets/fonts/PlayfairDisplay-Regular.ttf \
  --line 'Guia Visual das' --line 'Vitaminas' --emphasis 1 \
  --collection 'Micronutrientes' --output-dir caminho/saidas

Não gera fotografias nem escolhe a distribuição do título. Usar as fontes compartilhadas dentro da pasta desta skill e a logo existente.
Recebe exatamente duas fotografias e salva proposta-01.png e proposta-02.png.
Preview exige --preview.
Não sobrescreve arquivos sem --overwrite. Formato final: 1200 x 900, sRGB.
Fotos precisam ter proporção 4:3; recorte central só com --allow-crop.
"""
from __future__ import annotations

import argparse
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageCms, ImageDraw, ImageFont, ImageOps

WIDTH, HEIGHT, SCALE = 1200, 900, 2
WINE, CORAL, OLIVE = '#641D24', '#EF7053', (130, 132, 90)
SIGNATURE = 'Soluções para nutricionistas'
SUBTITLE = 'Fundamentos e aplicação clínica'
COLLECTION_LABEL = 'COLEÇÃO'
COLLECTION_COLOR = '#665659'
SRGB = ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB'))


def load_image(path: Path, alpha: bool = False) -> Image.Image:
    with Image.open(path) as source:
        source.load()
        image = ImageOps.exif_transpose(source)
        profile = source.info.get('icc_profile')
        transparency = image.convert('RGBA').getchannel('A') if alpha else None
        if profile:
            image = ImageCms.profileToProfile(
                image, ImageCms.ImageCmsProfile(BytesIO(profile)),
                SRGB, outputMode='RGB')
        else:
            image = image.convert('RGB')
        if transparency is not None:
            image.putalpha(transparency)
        return image.copy()


def font(path: Path, size: float) -> ImageFont.FreeTypeFont:
    loaded = ImageFont.truetype(str(path), round(size * SCALE))
    # Fixar peso 400 em arquivos variáveis, quando disponível.
    try:
        axes = loaded.get_variation_axes()
    except OSError:
        axes = []
    if axes:
        values = [axis['default'] for axis in axes]
        for index, axis in enumerate(axes):
            name = axis['name']
            if isinstance(name, bytes):
                name = name.decode('utf-8', errors='replace')
            if name.lower() == 'weight':
                values[index] = min(axis['maximum'], max(axis['minimum'], 400))
        loaded.set_variation_by_axes(values)
    return loaded


def measure(text: str, loaded: ImageFont.FreeTypeFont) -> tuple[float, float]:
    left, top, right, bottom = loaded.getbbox(text)
    return (right - left) / SCALE, (bottom - top) / SCALE


def put_text(layer: Image.Image, text: str, x: float, y: float,
             loaded: ImageFont.FreeTypeFont, color: str) -> None:
    # Coordenadas representam o canto superior esquerdo da tinta visível.
    box = loaded.getbbox(text)
    ImageDraw.Draw(layer).text(
        (round(x*SCALE)-box[0], round(y*SCALE)-box[1]),
        text, font=loaded, fill=color)


def rule(layer: Image.Image, x0: float, x1: float, y: float) -> None:
    draw = ImageDraw.Draw(layer)
    start, end = round(x0*SCALE), round(x1*SCALE)
    for x in range(start, end):
        progress = (x-start) / max(1, end-start-1)
        alpha = round(255 * .75 * (1-progress)**1.15)
        draw.line((x, round(y*SCALE), x, round(y*SCALE)+SCALE-1),
                  fill=(*OLIVE, alpha))


def title_layout(lines: list[str], emphasis: int, path: Path):
    """Ajustar todas as linhas juntas; manter destaque 1,55 vezes maior."""
    gap, max_width, max_height = 14, 566, 260
    for step in range(154, 63, -1):
        small = step / 2
        sizes = [small * 1.55 if i == emphasis else small
                 for i in range(len(lines))]
        fonts = [font(path, size) for size in sizes]
        boxes = [measure(text, loaded) for text, loaded in zip(lines, fonts)]
        height = sum(h for _, h in boxes) + gap*(len(lines)-1)
        if max(w for w, _ in boxes) <= max_width and height <= max_height:
            if small < 42:
                break
            return fonts, boxes, gap, height
    raise ValueError('Título longo demais para manter a hierarquia e a leitura. '
                     'Aprovar um título menor ou outra quebra em duas/três linhas.')


def prepare(photo: Image.Image, allow_crop: bool) -> Image.Image:
    if abs(photo.width / photo.height - WIDTH/HEIGHT) > .01 and not allow_crop:
        raise ValueError('Fotografia fora da proporção 4:3. Gerar/adaptar a cena '
                         'ou autorizar recorte com --allow-crop. Não será esticada.')
    return ImageOps.fit(photo, (WIDTH*SCALE, HEIGHT*SCALE),
                        method=Image.Resampling.LANCZOS).convert('RGBA')


def save(image: Image.Image, path: Path) -> None:
    image.convert('RGB').save(path, format='PNG', icc_profile=SRGB.tobytes())


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__,
                                    formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--photo', type=Path, action='append', required=True)
    parser.add_argument('--logo', type=Path, required=True)
    parser.add_argument('--body-font', type=Path, required=True)
    parser.add_argument('--title-font', type=Path, required=True)
    parser.add_argument('--line', action='append', required=True,
                        help='Repetir para cada linha aprovada; duas ou três linhas.')
    parser.add_argument('--emphasis', type=int, required=True,
                        help='Número da linha maior: 1, 2 ou 3.')
    parser.add_argument('--emphasis-color', choices=('coral', 'wine'), default='coral')
    parser.add_argument('--collection', required=True,
                        help='Nome de HomeBook.coverCollection para o e-book.')
    parser.add_argument('--output-dir', type=Path, required=True)
    parser.add_argument('--preview', action='store_true')
    parser.add_argument('--allow-crop', action='store_true')
    parser.add_argument('--overwrite', action='store_true')
    args = parser.parse_args()
    try:
        lines = [line.strip() for line in args.line]
        if len(lines) not in (2, 3) or any(not line or '\n' in line for line in lines):
            raise ValueError('Informar duas ou três linhas não vazias, sem quebras internas.')
        args.collection = args.collection.strip()
        if not args.collection or '\n' in args.collection:
            raise ValueError('--collection deve conter um nome não vazio em uma linha.')
        if len(args.photo) != 2:
            raise ValueError('Informar exatamente duas fotografias, uma para cada proposta.')
        if not 1 <= args.emphasis <= len(lines):
            raise ValueError('--emphasis deve indicar uma das linhas informadas.')
        inputs = [*args.photo, args.logo, args.body_font, args.title_font]
        for path in inputs:
            if not path.is_file():
                raise ValueError(f'Arquivo não encontrado: {path}')
        outputs = [args.output_dir / f'proposta-{i:02d}.png'
                   for i in range(1, len(args.photo)+1)]
        previews = [args.output_dir / f'preview-{i:02d}.png'
                    for i in range(1, len(args.photo)+1)] if args.preview else []
        for path in outputs + previews:
            if path.resolve() in {p.resolve() for p in inputs}:
                raise ValueError(f'A saída sobrescreveria uma entrada: {path}')
            if path.exists() and not args.overwrite:
                raise ValueError(f'Saída já existe: {path}. Usar outro diretório '
                                 'ou --overwrite para substituição autorizada.')
        fonts, boxes, gap, title_height = title_layout(
            lines, args.emphasis-1, args.title_font)
        body = font(args.body_font, 32)
        signature = font(args.body_font, 27)
        collection_label = font(args.body_font, 18)
        collection_name = font(args.title_font, 30)
        if measure(SUBTITLE, body)[0] > 566 or measure(SIGNATURE, signature)[0] > 445:
            raise ValueError('Métricas incompatíveis. Conferir os arquivos da fonte Inter.')
        collection_width, collection_height = measure(args.collection, collection_name)
        if collection_width > WIDTH - 96:
            raise ValueError('Nome da coleção excede a largura disponível no rodapé.')
        # Validar todas as fotos antes de criar qualquer saída.
        for path in args.photo:
            with Image.open(path) as photo:
                oriented = ImageOps.exif_transpose(photo)
                if abs(oriented.width/oriented.height - WIDTH/HEIGHT) > .01 and not args.allow_crop:
                    raise ValueError(f'{path}: proporção diferente de 4:3; adaptar a cena '
                                     'ou autorizar --allow-crop.')
        logo = ImageOps.contain(load_image(args.logo, alpha=True),
                               (160*SCALE, 160*SCALE), Image.Resampling.LANCZOS)
        overlay = Image.new('RGBA', (WIDTH*SCALE, HEIGHT*SCALE))
        overlay.alpha_composite(logo, (29*SCALE, 36*SCALE))
        put_text(overlay, SIGNATURE, 194, 98, signature, WINE)
        rule(overlay, 194, 194+measure(SIGNATURE, signature)[0], 132)
        # Manter duas linhas na posição-base; acomodar terceira linha com respiro.
        y = 278
        for i, (text, loaded, (_, height)) in enumerate(zip(lines, fonts, boxes)):
            color = (CORAL if args.emphasis_color == 'coral' else WINE) if i == args.emphasis-1 else (WINE if args.emphasis_color == 'coral' else CORAL)
            put_text(overlay, text, 44, y, loaded, color)
            y += height + gap
        rule_y = max(494, 278+title_height+24)
        rule(overlay, 47, 47+measure(SUBTITLE, body)[0], rule_y)
        put_text(overlay, SUBTITLE, 47, rule_y+25, body, WINE)
        label_height = measure(COLLECTION_LABEL, collection_label)[1]
        collection_y = HEIGHT - 48 - collection_height
        label_y = collection_y - 8 - label_height
        put_text(overlay, COLLECTION_LABEL, 48, label_y, collection_label, COLLECTION_COLOR)
        put_text(overlay, args.collection, 48, collection_y, collection_name, COLLECTION_COLOR)
        args.output_dir.mkdir(parents=True, exist_ok=True)
        for index, (photo_path, output) in enumerate(zip(args.photo, outputs)):
            canvas = prepare(load_image(photo_path), args.allow_crop)
            result = Image.alpha_composite(canvas, overlay).resize(
                (WIDTH, HEIGHT), Image.Resampling.LANCZOS).convert('RGB')
            save(result, output)
            if args.preview:
                save(result.resize((600, 450), Image.Resampling.LANCZOS), previews[index])
            print(output)
    except (ValueError, OSError, ImageCms.PyCMSError) as error:
        parser.exit(2, f'Erro: {error}\n')


if __name__ == '__main__':
    main()
