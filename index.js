// Declaration
var start = null;

var goal = null;

var open_nodes = [];

var closed_nodes = [];

var possibledir = [[0,1],[1,1],[1,0],[1,-1],[-1,1],[-1,-1],[0,-1],[-1,0]];

var grid = new Array(7);

class Node {
    constructor(cost, parent,column,row) {
      this.cost = cost;
      this.parent = parent;
      this.column = column;
      this.row = row;
      this.closed = false;
    }

    h()
    {
        return Math.sqrt(Math.pow(goal.row-this.row,2)+Math.pow(goal.column-this.column,2));
    }

    updateCost(costofmovement,callingnodecost,parentNode)
    {
        if(this.cost >= costofmovement+callingnodecost+this.h())
        {
            this.parent = parentNode; 
            this.cost = costofmovement+callingnodecost+this.h();
        }
        
    };

  
}

function checkifInsideArray(array,row,column)
{
    for (let index = 0; index < array.length; index++) {
        
        if(array[index].row == row && array[index].column == column)
        {
            return false;
        }
        
    }

    return true;
}

function compare( a, b ) {
    if ( a.cost < b.cost ){
      return -1;
    }
    if ( a.cost > b.cost ){
      return 1;
    }
    return 0;
  }



function createMatrix()
{

    

    for (let i = 0; i < grid.length; i++) 
    {
        grid[i] = new Array(7);
        for (let j = 0; j < grid[i].length; j++) 
        {
            grid[i][j] = new Node(999,null,j,i);
            
        }
        
    }

    createTable(grid);
}

createMatrix();
// createTable([["row 1, cell 1", "row 1, cell 2"], ["row 2, cell 1", "row 2, cell 2"]])


function searchbestRoute()
{
    var currentNode = start;
    var searching = true;
   while(searching)
   {
    for (let index = 0; index < possibledir.length; index++) {

        var rows = parseInt(currentNode.row)+parseInt(possibledir[index][0]);
        var colums = parseInt(currentNode.column)+parseInt(possibledir[index][1]);

       
     
        if(rows < grid.length && rows >= 0 && colums < grid[0].length && colums >= 0 )
        {

            console.log("CURRENTNODE("+currentNode.row+"/"+currentNode.column+")"+rows+"//"+colums);
        
            if(rows == goal.row && colums == goal.column)
            {   
                searching = false;
               
            }
    
     
            if(!grid[rows][colums].closed)
            {
             
                if(checkifInsideArray(open_nodes,rows,colums))
                {
                    open_nodes.push(grid[rows][colums]);
                }

                if(parseInt(Math.abs(possibledir[index][0]))+parseInt(Math.abs(possibledir[index][1]) == 2))
                {

                    grid[rows][colums].updateCost(14,currentNode.cost,currentNode);
                }else
                {
                    grid[rows][colums].updateCost(10,currentNode.cost,currentNode);
                }
     
            }
      
        }
   
    }
    if(searching)
    {
        open_nodes.sort(compare);
        currentNode.closed = true;
        currentNode = open_nodes[0];
        open_nodes.shift();
    }
   
   
   }  
 
   while(currentNode.parent != null)
   {
    document.getElementsByClassName(currentNode.row+"/"+currentNode.column)[0].style.background ="#FDFD96";
    currentNode = currentNode.parent;
   }
   

}

function createTable(tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
  
    tableData.forEach(function(rowData) {
      var row = document.createElement('tr');
        
      rowData.forEach(function(cellData) {
        var cell = document.createElement('td');
        cell.classList.add(cellData.row+"/"+cellData.column);
        cell.onclick = function() 
        {
            
            switch (document.querySelector('input[name="select"]:checked').value) {
                case "Start":
                        this.style.background = "#ff6961"
                        start = cellData;
                        start.cost = 0;
                     
                    break;

                case "Goal":
                        this.style.background = "#77dd77"
                        goal = cellData;
                        goal.closed = false;
                    break;

                case "Wall":
                        this.style.background = "#cfcfc4"
                        cellData.closed = true;
                    break;
            
                default:
                    break;
            }
            
        };
        cell.classList.add("rcorners1");
        cell.appendChild(document.createTextNode(cellData.row+"/"+cellData.column));
        row.appendChild(cell);
      });
  
      tableBody.appendChild(row);
    });
    
    table.appendChild(tableBody);
    table.style.maxWidth = "50vw";
    table.style.maxHeight = "50vh";
    table.style.display = "block"
    document.body.appendChild(table);
  }
  
