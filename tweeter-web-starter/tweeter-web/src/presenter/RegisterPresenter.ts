import { Buffer } from "buffer";
import { AuthenticationPresenter } from "./AuthenticationPresenter";

export class RegisterPresenter extends AuthenticationPresenter {
    private _imageUrl = "";

    public get imageUrl() {
        return this._imageUrl;
    }

    private set imageUrl(value: string) {
        this._imageUrl = value;
    }

    public async handleImageFile(file: File | undefined): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
            if (file) {
                this.imageUrl = URL.createObjectURL(file);

                const reader = new FileReader();
                reader.onload = (event: ProgressEvent<FileReader>) => {
                    const imageStringBase64 = event.target?.result as string;

                    // Remove unnecessary file metadata from the start of the string.
                    const imageStringBase64BufferContents =
                        imageStringBase64.split("base64,")[1];

                    const bytes: Uint8Array = Buffer.from(
                        imageStringBase64BufferContents,
                        "base64"
                    );

                    resolve(bytes);
                };

                reader.onerror = reject;
                reader.readAsDataURL(file);
            } else {
                this.imageUrl = "";
                resolve(new Uint8Array());
            }
        });
    };

    public async doRegister(firstName: string, lastName: string, alias: string, password: string, imageBytes: Uint8Array) {
        await this.doAuthentication(async () => this.service.register(
            firstName,
            lastName,
            alias,
            password,
            imageBytes
        ), "register user");
    };

    public checkSubmitButtonStatus(firstName: string, lastName: string, alias: string, password: string): boolean {
        return !firstName || !lastName || !alias || !password || this.imageUrl.length === 0;
    };
}