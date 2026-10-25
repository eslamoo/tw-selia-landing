"""Builds the Themes Marketplace screenshots for tw-selia-landing from full-page renders."""
import sys
from PIL import Image, ImageDraw, ImageFilter

SHOTS = sys.argv[1]
OUT = sys.argv[2]
THUMBS = sys.argv[3]
W, H = 1920, 1080
GOLD = (212, 165, 116)

t1d = Image.open(f"{SHOTS}/t1-desktop.png").convert("RGB")   # 2x, css * 2
t2d = Image.open(f"{SHOTS}/t2-desktop.png").convert("RGB")
t1m = Image.open(f"{SHOTS}/t1-mobile.png").convert("RGB")    # 3x, css * 3
t2m = Image.open(f"{SHOTS}/t2-mobile.png").convert("RGB")


def backdrop():
    img = Image.new("RGB", (W, H))
    top, bottom = (250, 246, 240), (238, 226, 210)
    px = img.load()
    for y in range(H):
        t = y / (H - 1)
        c = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        for x in range(W):
            px[x, y] = c
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(glow)
    d.ellipse((-300, -380, 900, 620), fill=GOLD + (60,))
    d.ellipse((1250, 520, 2300, 1500), fill=GOLD + (50,))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    img.paste(glow, (0, 0), glow)
    return img


def rounded(im, radius):
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, im.size[0] - 1, im.size[1] - 1), radius, fill=255)
    return mask


def shadow(canvas, box, radius, blur=40, offset=18, alpha=70):
    x0, y0, x1, y1 = box
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(layer).rounded_rectangle((x0, y0 + offset, x1, y1 + offset), radius, fill=(40, 25, 10, alpha))
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    canvas.paste(layer, (0, 0), layer)


def crop_css(src, scale, x, y, w, h):
    return src.crop((int(x * scale), int(y * scale), int((x + w) * scale), int((y + h) * scale)))


def browser(canvas, shot, x, y, width):
    bar = 44
    view = shot.resize((width, int(shot.size[1] * width / shot.size[0])), Image.LANCZOS)
    h = view.size[1] + bar
    shadow(canvas, (x, y, x + width, y + h), 18)
    frame = Image.new("RGB", (width, h), (255, 255, 255))
    d = ImageDraw.Draw(frame)
    d.rectangle((0, 0, width, bar), fill=(241, 238, 234))
    for i, c in enumerate([(210, 205, 199), (210, 205, 199), (210, 205, 199)]):
        cx = 26 + i * 22
        d.ellipse((cx - 6, bar / 2 - 6, cx + 6, bar / 2 + 6), fill=c)
    d.rounded_rectangle((width * 0.3, 11, width * 0.7, bar - 11), 11, fill=(255, 255, 255))
    frame.paste(view, (0, bar))
    canvas.paste(frame, (x, y), rounded(frame, 18))


def phone(canvas, shot, x, y, width):
    bezel = 14
    screen_w = width - bezel * 2
    screen = shot.resize((screen_w, int(shot.size[1] * screen_w / shot.size[0])), Image.LANCZOS)
    h = screen.size[1] + bezel * 2
    shadow(canvas, (x, y, x + width, y + h), 54, blur=36)
    body = Image.new("RGB", (width, h), (22, 20, 18))
    body.paste(screen, (bezel, bezel), rounded(screen, 40))
    ImageDraw.Draw(body).rounded_rectangle((width / 2 - 52, bezel + 12, width / 2 + 52, bezel + 40), 14, fill=(22, 20, 18))
    canvas.paste(body, (x, y), rounded(body, 54))


def save(img, name):
    img.save(f"{OUT}/{name}.jpg", quality=90, optimize=True)
    print(name)


# 1: default template, desktop and phone heroes
c = backdrop()
browser(c, crop_css(t1d, 2, 0, 0, 1440, 980), 150, 120, 1260)
phone(c, crop_css(t1m, 3, 0, 0, 390, 844), 1430, 150, 360)
save(c, "01-abaya-template")

# 2: product card with quick buy
c = backdrop()
browser(c, crop_css(t1d, 2, 0, 950, 1440, 980), 150, 120, 1260)
phone(c, crop_css(t1m, 3, 0, 810, 390, 844), 1430, 150, 360)
save(c, "02-product-quick-buy")

# 3: offers template
c = backdrop()
browser(c, crop_css(t2d, 2, 0, 0, 1440, 980), 510, 120, 1260)
phone(c, crop_css(t2m, 3, 0, 1020, 390, 844), 130, 150, 360)
save(c, "03-offers-template")

# 4: trust sections
c = backdrop()
browser(c, crop_css(t1d, 2, 0, 3220, 1440, 790), 510, 180, 1260)
phone(c, crop_css(t1m, 3, 0, 1880, 390, 844), 130, 150, 360)
save(c, "04-trust-sections")

# 5: the two templates side by side
c = backdrop()
for i, name in enumerate(["abaya-elegance", "fashion-offers"]):
    thumb = Image.open(f"{THUMBS}/{name}.jpg").convert("RGB")
    browser(c, thumb.crop((0, 0, 768, 1080)), 300 + i * 700, 90, 620)
save(c, "05-two-templates")

# 6: three phones
c = backdrop()
for i, (src, y) in enumerate([(t2m, 0), (t1m, 810), (t2m, 1020)]):
    phone(c, crop_css(src, 3, 0, y, 390, 844), 420 + i * 400, 140, 360)
save(c, "06-mobile-first")
