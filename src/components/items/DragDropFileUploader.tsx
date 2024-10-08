import styled from "styled-components";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import toast from "react-hot-toast";
import { getBase64 } from "utils/common";

interface DragDropFileUploaderProps {
  id: React.Key;
  fileTypes: string | string[];
  onChange: (file: any) => void;
  defaultFile?: any;
  disabled?: boolean;
}

const DragDropFileUploader: React.FC<DragDropFileUploaderProps> = ({
  id,
  fileTypes,
  onChange,
  defaultFile,
  disabled,
}) => {
  const [file, setFile] = useState<any>(null);
  const handleChange = (file: any) => {
    onChange(file);
    getBase64(file).then((res) => {
      setFile(res);
    });
  };

  return (
    <Container>
      <FileUploader
        id={id}
        types={fileTypes}
        fileOrFiles={file}
        disabled={disabled ? disabled : false}
        handleChange={handleChange}>
        <DisplayContainer
          onClick={() => {
            if (disabled) {
              toast.dismiss();
              toast.error("이미지 수정이 불가합니다.");
            }
          }}>
          {file === null ? (
            <>
              {defaultFile ? (
                <img
                  src={defaultFile}
                  alt="file"
                  title="file"
                  className="upload-image"
                />
              ) : (
                <div className="default-wrap">
                  <img
                    id="upload-icon"
                    src="images/icon-add-img.svg"
                    alt="upload"
                  />
                  <span>{disabled ? "이미지 수정불가" : "이미지 올리기"}</span>
                </div>
              )}
            </>
          ) : (
            <img
              src={file}
              alt="file"
              title="file"
              className="upload-image"
            />
          )}
        </DisplayContainer>
      </FileUploader>
    </Container>
  );
};

export default DragDropFileUploader;

const Container = styled.div`
  width: 288px;
  height: 100%;
  .is-disabled {
    border: none;
  }
`;

const DisplayContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.lightGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 15px;
  cursor: pointer;
  .default-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    #upload-icon {
      margin-bottom: 10px;
    }
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;
