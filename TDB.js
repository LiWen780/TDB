let database = [];

class TDB{
    
    //CREATE DATABASE
    constructor(name){
        
        this.name = name;
    }
    
    //CREATE THE TABLES FOR THE DATABASE
    //-------------------------------------------------------------------------------
    createTables(tables){
        
        this.table = tables.split(",");
        
        for(var space = 0; space<this.table.length;space++)
        {
            this.table[space] = this.table[space].trim();
        }
        
    }
    //ADD DATA TO THE DATABASE FOR EACH ID
    //-------------------------------------------------------------------------------
    addData(id, data){
        
        var info = data.split(",");
        
        database[database.length] = [];
        
        for(var j=0;j<this.table.length;j++)
        {
            //database[data_id][table]
            if(id != "")
            {
                database[id][j] = info[j];
            }
            else
            {
                database[database.length-1][j] = info[j];
            }
        }  
        
    }
	//UPDATE DATA FROM SOMEWHERE ON A TABLE
	//---------------------------------------------------------------------------------
	update(id,table,data){
		var tab_in = this.table.indexOf(table);
		
		database[id][tab_in] = data;
	}
	
    //RETURN THE DATA FROM A TABLE FOR AN ID
    //------------------------------------------------------------------------------
    getData(id, table){
        
        //find the table id
        var t_index = this.table.indexOf(table);
        
        return database[id][t_index];
    }
    
    //GET THE NAME OF THE DATABASE
    //------------------------------------------------------------------------------
    getName(){
        return this.name;
    }
    
    //RETURN THE COMPLETE INFORMATION ABOUT A ROW OR ID
    //------------------------------------------------------------------------------
    getInformation(id){
        var data_storage = "";
        
        for(var k=0; k<this.table.length;k++)
        {
            data_storage += database[id][k]+" &nbsp;&nbsp;";
        }
        return data_storage;
    }
	
	//DELETE THE INFORMATION OF A ROW OR ID
	//-------------------------------------------------------------------------------
	remove(id){
		database.splice(id,1);
	}
}
    
