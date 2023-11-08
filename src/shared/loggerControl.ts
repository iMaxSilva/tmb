export interface ILoggerControl {
    trainInfo: boolean;
    userInfo: boolean;
}

export const loggerControl: ILoggerControl = {
    trainInfo: false,
    userInfo: true,
}
