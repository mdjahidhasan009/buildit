
// Helper function to convert a blob to a readable stream
export const blobToStream = (blob) => {
    const readableInstanceStream = new Readable({
      read() {
        this.push(blob);
        this.push(null);
      }
    });
  
    return readableInstanceStream;
  };