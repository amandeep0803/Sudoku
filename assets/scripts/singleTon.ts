export class singleTon{
    private static _instance:singleTon=new singleTon();
    private sudoku:any[]=[];
    constructor(){
        if(singleTon._instance){
            throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
        }
        singleTon._instance = this;
    }
    public static getInstance():singleTon
    {
        return singleTon._instance;
    }
    public initializeSudoku(){
        for(let i=0;i<3;i++){
            let sudokuRow:any[]=[];
            for(let j=0;j<3;j++){
                let box:any[]=[];
                for(let k=0;k<3;k++){
                    let boxRow:any[]=[];
                    for(let l=0;l<3;l++){
                        boxRow.push(-1);
                    }
                    box.push(boxRow);
                }
                sudokuRow.push(box);
            }
            this.sudoku.push(sudokuRow);
        }
        console.log(this.sudoku)
    }
    public fillSudoku(index : any ,n : any )
    {
        n=="" ? n=-1 : n ;

        let indexArr=index.split(" ");
        this.sudoku[indexArr[0]][indexArr[1]][indexArr[2]][indexArr[3]]=parseInt(n);
    }
    public checkSudoku(){
        let check1=this.checkSpace();
        if(check1)
        {
            console.log("Empty Space found");
        }
        else{
            let check2 = this.checkRowColumnBox();
            if(check2[0])
            {
                switch(check2[1]){
                    case 'row':
                        console.log("Same Element Found in a row");
                        break;
                    case 'column':
                        console.log("Same Element Found in a column");
                        break;
                    case 'box':
                        console.log("Same Element Found in a box");
                        break;
                }
            }
            else{
                console.log("Congratulations, You Won");     
            }
        }
    }
    private checkSpace()
    {
        let temp:any[]=this.sudoku.flat(Infinity);
        if(temp.includes(-1)){
            return 1;
        }
        return 0;
    }
    private checkRowColumnBox( ){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                let tempRow:any[]=[];
                let tempColumn:any[]=[];
                let tempBox:any[]=[];
                for(let k=0;k<3;k++){
                    for(let l=0;l<3;l++){
                        if(tempRow.includes(this.sudoku[i][k][j][l]))
                        {
                            return [1,'row'];
                        }
                        tempRow.push(this.sudoku[i][k][j][l]);
                        if(tempColumn.includes(this.sudoku[k][i][l][j]))
                        {
                            return [1,'column'];
                        }
                        tempColumn.push(this.sudoku[k][i][l][j]);
                        if(tempBox.includes(this.sudoku[i][j][k][l]))
                        {
                            return [1,'box'];
                        }
                        tempBox.push(this.sudoku[i][j][k][l]);
                    }
                }
            }
        }
        return 0;
    }
    // public getSudoku(){
    //     console.log(this.sudoku);
    // }
}