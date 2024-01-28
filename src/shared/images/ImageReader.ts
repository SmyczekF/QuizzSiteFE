export const returnImage = (image: {type: string, data: number[]} | undefined) => {
    if(image) {
        const base64 = btoa(
            new Uint8Array(image.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
            ),
        );
        return `data:image/png;base64,${base64}`;
    }
    return null;
}