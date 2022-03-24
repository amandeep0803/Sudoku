
import { _decorator, Component, Node, Prefab, instantiate, UITransform, JsonAsset } from 'cc';
const { ccclass, property } = _decorator;

import {singleTon} from './singleTon';
 
@ccclass('mainBG')
export class mainBG extends Component 
{
    @property({type:Prefab})
    box:Prefab
    @property({type:JsonAsset})
    data:JsonAsset
    boxData:any[]=[];
    selectedSudoku:any;
    selectedPositions:any[]=[];
    singleTonInstance:singleTon=singleTon.getInstance();
    start () {
        this.singleTonInstance.initializeSudoku();
        let jsonData = this.data.json;
        this.selectedSudoku = Object.values(jsonData)[Math.floor(Math.random()*Object.values(jsonData).length)]
        console.log(this.selectedSudoku);
        let parentWidth=this.node.getComponent(UITransform).width;
        let parentHeight=this.node.getComponent(UITransform).height;

        let childWidth=this.box.data.width;
        let childHeight=this.box.data.height;

        let initialXPos=-parentWidth*0.5+childWidth*0.5;
        let initialYPos=parentHeight*0.5-childHeight*0.5;
        let x=initialXPos;
        let y=initialYPos;
        for(let i=0;i<3;i++){
            let temp:any[]=[];
            for(let j=0;j<3;j++){
                let tempNode:any=instantiate(this.box);
                this.node.addChild(tempNode);
                tempNode.name=i+" "+j;
                temp.push(tempNode);
                tempNode.getComponent('box').generateBox();
                tempNode.setPosition(x,y,0);
                x+=childWidth+10;
            }
            this.boxData.push(temp);
            y-=(childHeight+10);
            x=initialXPos;
        }
        this.fillSelectedPositions();
        // this.singleTonInstance.getSudoku();
    }
    generatePosition(){
        let location:any[]=[];
        let boxLocation:any[]=[];
        let tileLocation:any[]=[];
        boxLocation.push(Math.floor(Math.random()*3));
        boxLocation.push(Math.floor(Math.random()*3));
        tileLocation.push(Math.floor(Math.random()*3));
        tileLocation.push(Math.floor(Math.random()*3));
        location.push(boxLocation);
        location.push(tileLocation);
        return location;
    }
    fillSelectedPositions()
    {
        let n=Math.floor(Math.random()*5+20);
        console.log(n);
        for(let i=0;i<n;i++){
            let location=this.generatePosition();
            this.selectedPositions.push(location);
            let boxRow    = this.selectedPositions[i][0][0];
            let boxColumn = this.selectedPositions[i][0][1];
            let tile      = this.selectedPositions[i][1];
            let filledNumber=this.selectedSudoku[boxRow][boxColumn][tile[0]][tile[1]];
            while(this.boxData[boxRow][boxColumn].getComponent('box').fillSelectedPosition(tile,filledNumber)){
                this.selectedPositions.pop();
                location=this.generatePosition();
                this.selectedPositions.push(location);
                boxRow=this.selectedPositions[i][0][0];
                boxColumn=this.selectedPositions[i][0][1];
                tile=this.selectedPositions[i][1];
                filledNumber=this.selectedSudoku[boxRow][boxColumn][tile[0]][tile[1]];
            }
        }
    }
    onBtnClick(){
        this.singleTonInstance.checkSudoku();
    }
}

