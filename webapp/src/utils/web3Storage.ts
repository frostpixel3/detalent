/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// @ts-ignore
import { PinataSDK } from 'pinata-web3';

type UploadToWeb3StorageOptions = {
  maxRetries?: number
  maxChunkSize?: number
  wrapWithDirectory?: boolean
  name?: string
}

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT as string,
});

export const uploadToWeb3Storage = async (files: File[], _options?: UploadToWeb3StorageOptions): Promise<string> => {
  if (files.length === 1) {
    const upload = await pinata.upload.file(files[0]);
    return upload.IpfsHash
  }

  const upload = await pinata.upload.fileArray(files);
  return upload.IpfsHash;
};

export const uploadJSONToWeb3Storage = async (data: any): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const upload = await pinata.upload.json(data);
  return upload.IpfsHash;
}

export const getCIDLink = (cid: string, path?: string) => {
  const basePath = import.meta.env.VITE_PINATA_GATEWAY as string;
  if (!path) {
    return `https://${basePath}/ipfs/${cid}`;
  }
  return `https://${basePath}/ipfs/${cid}${path.startsWith('/') ? path: `/${path}`}`;
}
