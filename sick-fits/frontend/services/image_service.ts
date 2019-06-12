interface UploadImageResponse {
  image: string;
  largeImage: string;
}

export async function uploadImage(
  file: File,
): Promise<UploadImageResponse | undefined> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'sickfits');
  try {
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/zeroliu/image/upload',
      { method: 'POST', body: formData },
    );
    const json = await res.json();
    if (
      !json.secure_url ||
      !json.eager ||
      json.eager.length === 0 ||
      !json.eager[0].secure_url
    ) {
      throw new Error('Upload image response is incorrect.');
    }
    return {
      image: json.secure_url,
      largeImage: json.eager[0].secure_url,
    };
  } catch (e) {
    console.error(e.message);
  }
  return;
}
