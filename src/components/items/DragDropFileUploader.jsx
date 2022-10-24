import styled from 'styled-components';
import { FileUploader } from "react-drag-drop-files";
import { useState } from 'react';

const getBase64 = (fileObj) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileObj);
    reader.onload = () => {
      resolve(reader.result);
    }
    reader.onerror = function (error) {
      console.log("Error :", error);
    };
  });
};

export default function DragDropFileUploader({
  id, 
  fileTypes, 
  onChange,
  defaultFile, 
  disabled,
}) {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    onChange(file);
    getBase64(file).then(res => {
      setFile(res);
    });
  };

  return (
    <Container>
      <FileUploader id={id} types={fileTypes} fileOrFiles={file}
        disabled={disabled ? disabled : false}
        handleChange={handleChange}
      >
        <DisplayContainer>
          {file === null ? (
            <>
              {defaultFile ? (
                <img src={defaultFile} alt='file' title='file' className='upload-image' />
              ) : (
                <div className='default-wrap'>
                  <img id='upload-icon' src="images/icon-add-img.svg" alt="upload" />
                  <span>이미지 올리기</span>
                </div>
              )}
            </>
          ) : (
            <img src={file} alt='file' title='file' className='upload-image' />
          )}
        </DisplayContainer>
      </FileUploader>
    </Container>
  )
}

const Container = styled.div`
  width: 288px;
  height: 100%;
`;

const DisplayContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.color.lightGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 15px;
  cursor: pointer;
  .default-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    #upload-icon{
      margin-bottom: 10px;
    }
  }
  img{
    max-width: 100%;
    max-height: 100%;
  }
`;