export const returnImage = (
  image: { type: string; data: number[] } | undefined
) => {
  if (image) {
    const base64 = btoa(
      new Uint8Array(image.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    return `data:image/png;base64,${base64}`;
  }
  return undefined;
};

export const changeBase64Resolution = (
  base64: string | null,
  width: number,
  height: number
) => {
  if (!base64) return null;
  const img = new Image();
  img.src = base64;
  img.width = width;
  img.height = height;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL("image/png");
  }
  return null;
};

export const base64ToBlob = (base64String: string, contentType = "") => {
  const byteCharacters = atob(base64String.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
