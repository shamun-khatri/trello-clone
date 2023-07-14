import {ID, storage} from '@/appwrite';

const uploadImage = async (file: File) => {
    if (!file) return;

    const fileUploaded = await storage.createFile('64a44707e2d66a85d974', ID.unique(), file);

    return fileUploaded;
}

export default uploadImage;