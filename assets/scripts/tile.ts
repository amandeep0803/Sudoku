
import { _decorator, Component, Node, EditBox, Sprite } from 'cc';
const { ccclass, property } = _decorator;

import {singleTon} from './singleTon';
 
@ccclass('tile')
export class tile extends Component {
    @property({type:Node})
    editBox:Node;
    @property({type:Node})
    textLabel:Node;
    singleTonInstance:singleTon=singleTon.getInstance();
    start () {
        this.editBox.on('editing-did-ended',this.fillingTile,this);
    }
    fillTile(n:number){
        this.editBox.getComponent(EditBox).string=""+n;
        this.singleTonInstance.fillSudoku(this.editBox.name,n);
    }
    disableEditing(){
        this.editBox.getComponent(EditBox).enabled = false; 
        this.editBox.off('editing-did-ended',this.fillingTile,this); 
    }
    fillingTile(event){
        this.singleTonInstance.fillSudoku(event.node.name,event._string);
    }
    editBoxNaming(boxName){
        this.editBox.name=boxName+" "+this.node.name;
    }
    checkActive(){
        return this.editBox.getComponent(EditBox).enabled;
    }
}