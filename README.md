# TDB_1.1.js
TDB or Totoye DataBase is a small JavaScript database created by Li Wen to arrange data during web programming. We can use it to display data inside a table on a web page or to simply save temporarily data or permanent ones as cookie. 
You can use it in a HTML5 game for data manipulation.

# 1) How to create a table:
      Syntax:  new TDB.Table("COUNTRY", columns, rows);
      Syntax #2 : new TDB.Table("COUNTRY");
Columns and rows are objects or arrays containing the different columns and the rows within the table.
      
# 2) Adding columns:
      Syntax: .addColumn("Column1");
addColum is a method from the Table class. 
  
# 3) Adding rows:
      Syntax: .addRow("row1, row2, row3, row4, row5");
addRow is a method from the table class by which you can add row to the table.
 
# 4) Get the number of current space for data within the table:
      Syntax: .getSize()
It's a method from the Table class that returns the current size of the table.

# 5) Update a cell from the table:
      Syntax: .updateAt(row_id, column_id, new_Data)
      Example: country.updateAt(1, 0, "Asia")
You're updating the first column of the second row with the data "new_Data".

    Example 2: country.updateAt("Continent = Asia", "Position", "East")
You're updating the column "Position" at row where the data in column "Continent" is "Asia"

# 6) Get data from a cell of the data:
      Syntax: .getData(row_id, column_id)
      Syntax 2: country.getData("Countries = China", "Languages")
Get data in column "Languages" from the row where the data from column "Countries" is "China".

# 7) Delete an entire row from the table:
      Syntax: .removeRow(row_id)
      Syntax 2: country.removeRow("Countries = China")    
Remove the row where the data from column "Countries" is "China"
    
# 8) Delete an entire column from a table:
      Syntax: .removeColumn(column_id)
      Syntax 2: .removeColumn(column_name)
  
# 9) Delete an data from a cell within the data:
      Syntax: .removeData(row_id,row_id)
      Syntax 2: .removeData("Countries = Russia", "Continent");
Remove the data from the column "Continent" where the column "Countries" has data "Russia".

# 10) Get the name of your table:
      Syntax: .getName()
The method returns the name of your table.
 
# 11) Display your table with its data:
      Syntax: .Display(table_width, table_height)
      Syntax 2: .Display() 
This method returns a HTML table element so that you can use it anywhere you want on your page.
 
 # 12) Get the names of all the columns inside your table:
            Syntax: .getColumns();
Return a String value with names of all the columns.
    
 # 13) Save your table data as a cookie:
 
    a)  Create a storage space:  
            Syntax: new TDB.Storage("MyStorage_name")
        
    b) Add table to your storage:
            Syntax: .insertTable(your_table_element)
            
    c) Get a table from your storage as a Table(TDB table) element:
            Syntax: .selectTable("table_name")
      After using this method, you can use the result as a Table object. All the TDB.Table object can then be used.
      
    d) Know how many tables is inside your storage:
        Syntax: .size()
        
 # 14) Get and use a TDB storage space that you saved before, but not in your file or created long time ago.
            Syntax: new TDB.getStorage("storage_name")
            
This method returns a TDB.Storage object which means that it can use all the TDB.Storage object's methods.
