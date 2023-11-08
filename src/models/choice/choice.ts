export interface IChoice {
    name: string;
    value: MainPageChoiceEnum | InstancePageChoiceEnum | MainPageChoiceLabelEnum | InstancePageChoiceLabelEnum | number;
}

export enum MainPageChoiceEnum {
    LOGIN = 'LOGIN',
    EXIT = 'EXIT',
    DEVFN = 'DEVFN',
    LIST_INSTANCES = 'LIST_INSTANCES',
    BACK = 'BACK',
}

export enum MainPageChoiceLabelEnum {
    LOGIN = 'Criar uma nova instância',
    EXIT = 'Sair da aplicação',
    DEVFN = 'Dev Function',
    LIST_INSTANCES = 'Listar instâncias',
    BACK = 'Voltar',
}

export enum InstancePageChoiceLabelEnum {
    BUY_FUEL = 'Comprar combustível',
    REPAIR_TRAIN = 'Reparar trem',
    REPAIR_ALL_TRAINS = 'Reparar todos os trens',
    UPDATE_INFO = 'Atualizar informações do usuário',
    SHOW_LOGS = 'Exibir logs da instância',
    REMOVE_INSTANCE = 'Remover esta instância',
    MAIN_MENU = 'Voltar para o menu principal',
}

export enum InstancePageChoiceEnum {
    BUY_FUEL = 'BUY_FUEL',
    REPAIR_TRAIN = 'REPAIR_TRAIN',
    REPAIR_ALL_TRAINS = 'REPAIR_ALL_TRAINS',
    UPDATE_INFO = 'UPDATE_INFO',
    SHOW_LOGS = 'SHOW_LOGS',
    REMOVE_INSTANCE = 'REMOVE_INSTANCE',
    MAIN_MENU = 'MAIN_MENU',
}
