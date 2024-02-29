export interface BasicView {
    displayErrorMessage: (message: string) => void;
}
export interface MessageView extends BasicView {
    displayInfoMessage: (message: string, duration: number) => void;
    clearLastInfoMessage: () => void;
}
export class Presenter {
    private _view: BasicView;

    protected constructor(view: BasicView) {
        this._view = view;
    }

    protected async DoFailureReportingOperation(
        operation: () => Promise<void>,
        operationDescription: string) {
        try {
            await operation();
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to ${operationDescription} because of exception: ${error}`
            );
        }
    };

    protected get view(): BasicView {
        return this._view;
    }

    // protected set view(view: BasicView) {
    //     this._view = view;
    // }


}