
import { _decorator, Component, Node, UITransformComponent, UITransform, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('box')
export class box extends Component {
    
    @property({type:Prefab})
    tile:Prefab

    start () {
        // [3]
    }
    generateBox(){
        let parentWidth=this.node.getComponent(UITransform).width;
        let parentHeight=this.node.getComponent(UITransform).height;
        
        let childWidth=this.tile.data.width;
        let childHeight=this.tile.data.height;

        let initialXPos=-parentWidth*0.5+childWidth*0.5;
        let initialYPos=parentHeight*0.5-childHeight*0.5;

        let x=initialXPos;
        let y=initialYPos;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                let tempNode:any=instantiate(this.tile);
                this.node.addChild(tempNode);
                tempNode.name=i+" "+j;
                tempNode.getComponent('tile').editBoxNaming(this.node.name);
                tempNode.setPosition(x,y,0);
                x+=(childWidth+5);
            }
            y-=(childHeight+5);
            x=initialXPos;
        }
    }
    fillSelectedPosition(selectedPosition,filledNumber){
        let childNode:any=this.node.getChildByName(selectedPosition[0]+" "+selectedPosition[1]);
        if(!childNode.getComponent('tile').checkActive()){
            return 1;
        }
        else{
            childNode.getComponent('tile').fillTile(filledNumber);
            childNode.getComponent('tile').disableEditing();
            return 0;
        }
        
    }
}

