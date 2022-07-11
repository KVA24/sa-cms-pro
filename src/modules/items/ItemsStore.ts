import {observable} from "mobx";


export enum TabActive {
    GameItems = "gameItems",
    WheelItems = "wheelItems",
    Rewards = "rewards",
}

class ItemsStore {
    @observable public isLoading: boolean = false;
    @observable public activeTab: string = TabActive.GameItems;
}
export const itemsStore = new ItemsStore();
