import sys
from PIL import Image, ImageDraw
size = 1024
img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
grad = Image.new("RGB", (size, size))
px = grad.load()
a, b = (198, 139, 71), (224, 184, 136)
for y in range(size):
    for x in range(size):
        t = (x + y) / (2 * size)
        px[x, y] = tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))
mask = Image.new("L", (size, size), 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), 220, fill=255)
img.paste(grad, (0, 0), mask)
d = ImageDraw.Draw(img)
white, soft = (255, 255, 255, 255), (255, 255, 255, 150)
d.rounded_rectangle((232, 200, 792, 824), 56, outline=white, width=36)
d.rounded_rectangle((292, 262, 732, 452), 28, fill=white)
d.rounded_rectangle((292, 498, 600, 540), 21, fill=soft)
d.rounded_rectangle((292, 578, 520, 620), 21, fill=soft)
d.rounded_rectangle((292, 676, 732, 762), 43, fill=white)
img.resize((512, 512), Image.LANCZOS).save(sys.argv[1])
img.resize((250, 250), Image.LANCZOS).save(sys.argv[2])
