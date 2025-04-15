const uploadToCloudnary = async(pics) => {
    if(pics){
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "twitter");
        data.append("cloud_name", "dfqogbpbe");

        const res = await fetch("https://api.cloudinary.com/v1_1/dfqogbpbe/image/upload", {
            method: "POST",
            body: data,
          });
          const fileData = await res.json();

          return fileData.url.toString();
    }else{
        console.log("No image provided");
        return null;
    }
}

export default uploadToCloudnary

