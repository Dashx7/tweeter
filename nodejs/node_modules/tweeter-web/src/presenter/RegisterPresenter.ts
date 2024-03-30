import { Buffer } from "buffer";
import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";

export class RegisterPresenter extends AuthenticationPresenter {
    private imageURL: string = "";

    public constructor(view: AuthenticationView) {
        super(view);
    }



    public async doRegister(Alias: string, Password: string, firstName: string, lastName: string, imageBytes: Uint8Array) {
        this.doAuthentication(() => this.Service.register(
            firstName,
            lastName,
            Alias,
            Password,
            imageBytes
        ), "register user");
    }

    public checkSubmitButtonStatus(
        Alias: string,
        Password: string,
        firstName: string,
        lastName: string): boolean {
        console.log("checking submit button status")
        console.log(`Printing image url ${this.ImageURL}`)
        return (!Alias || !Password || !firstName || !lastName || this.ImageURL.length === 0);
    };

    public handleImageFile = (file: File | undefined) => {
        if (file) {
            this.ImageURL = URL.createObjectURL(file);
            console.log(`Set image URL ${this.ImageURL}`)

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

                return bytes;
            };
            reader.readAsDataURL(file);
        } else {
            this.ImageURL = "";
        }

        return new Uint8Array();

    };

    public set ImageURL(value: string) {
        this.imageURL = value;
    }

    public get ImageURL() {
        return this.imageURL;
    }

}