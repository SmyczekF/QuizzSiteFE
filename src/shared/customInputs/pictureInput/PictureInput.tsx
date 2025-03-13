import { FileInput, FileInputProps, Image } from "@mantine/core";
import styles from "./PictureInput.module.scss";
import { useState } from "react";
import { changeBase64Resolution } from "../../images/ImageReader";

type PictureInputProps = FileInputProps & {
  inputHeight: number;
  onPictureChange: (picture: string | undefined) => void;
  activePicture?: string;
};

const PictureInput = (props: PictureInputProps) => {
  const { inputHeight, onPictureChange, activePicture, ...rest } = props;

  const [image, setImage] = useState<File | undefined>();
  const [base64, setBase64] = useState<string | undefined>(activePicture);

  console.log(activePicture);

  //@todo: Add picture dimension selector & down scaler for images (to avoid avatar images of 5mb ex)
  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBase64(reader.result as string);
        onPictureChange(reader.result as string);
        setImage(file);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(undefined);
    }
  };

  return (
    <div style={{ height: inputHeight || "auto" }}>
      <FileInput
        classNames={{
          input: styles.fileInput,
          root: styles.fileInputRoot,
        }}
        styles={{
          root: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%",
            marginBottom: "10px",
          },
        }}
        accept="image/png,image/jpeg"
        placeholder="Add quiz image"
        value={image}
        {...rest}
        onChange={(file) => handleFileChange(file)}
        leftSection={<i className="pi pi-image" />}
      />
      <Image
        src={base64 || ""}
        alt="Selected image"
        className={styles.imagePreview}
        fit="contain"
        height={inputHeight - 50}
      />
    </div>
  );
};

export default PictureInput;
