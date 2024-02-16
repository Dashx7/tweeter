import { Buffer } from "buffer";
import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";

export class RegisterPresenter extends AuthenticationPresenter {

    private firstName: string = "";
    private lastName: string = "";
    private imageBytes: Uint8Array = new Uint8Array(0);
    private imageURL: string = "";

    public constructor(view: AuthenticationView) {
        super(view);
    }

    public async doRegister(rememberMeRef: boolean, url: string | undefined) {
        try {
            let [user, authToken] = await this.Service.register(
                this.firstName,
                this.lastName,
                this.Alias,
                this.Password,
                this.imageBytes
            );

            this.view.updateUserInfo(user, user, authToken, rememberMeRef);
            this.view.navigate("/");
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to register user because of exception: ${error}`
            );
        }
    }

    public updateSubmitButtonStatus(): void {
        this.view.updateSubmitButtonStatus(
            !this.Alias || !this.Password || !this.firstName || !this.lastName || this.imageURL.length === 0);
    }

    public handleImageFile = (file: File | undefined) => {
        if (file) {
            this.ImageURL = URL.createObjectURL(file);

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

                this.ImageBytes = bytes;
            };
            reader.readAsDataURL(file);
        } else {
            this.ImageURL = "";
            this.ImageBytes = new Uint8Array();
        }
    };

    public set FirstName(firstName: string) {
        this.firstName = firstName;
        this.updateSubmitButtonStatus();
    }
    public set LastName(lastName: string) {
        this.lastName = lastName;
        this.updateSubmitButtonStatus();
    }
    public set ImageBytes(imageBytes: Uint8Array) {
        this.imageBytes = imageBytes;
        this.updateSubmitButtonStatus();
    }
    public set ImageURL(imageURL: string) {
        this.imageURL = imageURL;
        this.updateSubmitButtonStatus();
    }
    public get ImageURL() {
        return this.imageURL;
    }
    public get FirstName() {
        return this.firstName;
    }
    public get LastName() {
        return this.lastName;
    }
    public get ImageBytes() {
        return this.imageBytes;
    }

}