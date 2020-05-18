(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.TDB = {}));
}(this, (function (exports) { 'use strict';

//-------------------------TABLE-----------------------------------------
	function Table(name, columns, rows)
	{
		this.tableGUI = null;
		this.name = name;
		this.columns = [];
		this.rows = [];
		this.size = 0;
		if(columns!= null && typeof(columns)=="object") 
		{ 
			this.columns = columns;
		}
		if(rows!= null && typeof(rows)=="object")
		{
			this.rows.push(rows);
		}
	}
	Object.assign( Table.prototype, {
		getSize: function()
		{
			this.size = Number(this.columns.length * this.rows.length);
			return this.size;
		},
		addColumn: function(col)
		{			
			this.columns.push(col);
		},
		addRow: function(ro)
		{
			var sp = ro.split(",");
			this.rows.push(sp);
		},
		
		updateAt: function(ro, col, data)
		{
			var ro1, col1;
			
			if(typeof(ro) == "string")
			{
				var xe = ro.split("=");
				var xeChange;
				
				xeChange = this.columns.indexOf(xe[0].trim());
				
				for(var seekR = 0; seekR < this.rows.length; seekR++)
				{
					if(this.rows[seekR][xeChange].trim() == xe[1].trim())
					{
						ro1 = seekR;
						break;
					}
				}
			}
			else{ro1 = ro;}
			if(typeof(col) == "string")
			{
				col1 = this.columns.indexOf(col);
			}
			else{col1 = col;}
			
			this.rows[ro1][col1] = data;
		},
		
		getData: function(ro,col)
		{
			var ro1, col1;
			
			if(typeof(ro) == "string")
			{
				var xe = ro.split("=");
				var xeChange;
				
				xeChange = this.columns.indexOf(xe[0].trim());
				
				for(var seekR = 0; seekR < this.rows.length; seekR++)
				{
					if(this.rows[seekR][xeChange].trim() == xe[1].trim())
					{
						ro1 = seekR;
						break;
					}
				}
			}
			else{ro1 = ro;}
			if(typeof(col) == "string")
			{
				col1 = this.columns.indexOf(col);
			}
			else{col1 = col;}
			
			return this.rows[ro1][col1];
		},
		removeRow: function(ro)
		{
			var ro1;
			
			if(typeof(ro) == "string")
			{
				var xe = ro.split("=");
				var xeChange;
				
				xeChange = this.columns.indexOf(xe[0].trim());
				
				for(var seekR = 0; seekR < this.rows.length; seekR++)
				{
					if(this.rows[seekR][xeChange].trim() == xe[1].trim())
					{
						ro1 = seekR;
						break;
					}
				}
			}
			else{ro1 = ro;}
			this.rows.splice(ro1,1);
		},
		removeColumn: function(col)
		{
			var col1;
			if(typeof(col) == "string")
			{
				col1 = this.columns.indexOf(col);
			}
			else{col1 = col;}
			
			this.columns.splice(col1,1);
			for(var del = 0; del< this.rows.length; del++)
			{
				this.rows[del].splice(col1,1);
			}
		},
		removeData: function(ro,co)
		{
			var r, c;
		
			if(typeof(ro) == "string")
			{
				var xe = ro.split("=");
				var xeChange;
				
				xeChange = this.columns.indexOf(xe[0].trim());
				
				for(var seekR = 0; seekR < this.rows.length; seekR++)
				{
					if(this.rows[seekR][xeChange].trim() == xe[1].trim())
					{
						r = seekR;
						break;
					}
				}
			}
			else{r = ro;}
			if(typeof(co) == "string")
			{
				c = this.columns.indexOf(co);
			}
			else{c = co;}
			
			this.rows[r][c] = null;
		},
		toString: function()
		{
			return "TDB version 1.1";
		},
		getName: function()
		{
			return this.name;
		},
		Display: function(width, height)
		{
			this.tableGUI = document.createElement("TABLE");
			this.tableGUI.style.width = (width || 500)+"px";
			this.tableGUI.style.height = (height || 500)+"px";
				
			var tr = document.createElement("TR");
			var td = document.createElement("TH");
			td.colSpan = this.columns.length;
			td.style.border = "1px solid black";
			td.style.backgroundColor = "#E3DBD9";
			td.innerHTML = this.name.toUpperCase();
				
			tr.appendChild(td);
			this.tableGUI.appendChild(tr);
			
			tr = document.createElement("TR");
			for(var cr = 0; cr< this.columns.length; cr++)
			{
				tr.style.backgroundColor = "#E3DBD9";
				td = document.createElement("TH");
				td.style.border = "1px solid black";
				td.innerHTML = this.columns[cr];
				tr.appendChild(td);
			}
			this.tableGUI.appendChild(tr);
			
			for(var i = 0; i < this.rows.length; i++)
			{
				tr = document.createElement("TR");
				
				for(var j = 0; j < this.columns.length; j++)
				{
					td = document.createElement("TD"); 
					td.style.border = "1px solid black";
					td.innerHTML = this.rows[i][j];
					
					//}
					
					td.style.textAlign = "center";
					
					tr.appendChild(td);
				}
				this.tableGUI.appendChild(tr);
			}
		
			return this.tableGUI;
		},
		getColumns: function()
		{
			var str = "";
			for(var i = 0; i< this.columns.length; i++)
			{
				if(i != this.columns.length-1)
				{
					str += this.columns[i]+", ";
				}
				else
				{
					str += this.columns[i];
				}
			}
			
			return str;
		}
	});
	
	//------------------------------------STORAGE--------------------------------------------------
	
	function Storage(name)
	{
		if(name!= null)
		{
			this.name = name;
			this.set = [];
			
			localStorage.setItem(this.name, JSON.stringify(this));
		}
	}
	Object.assign( Storage.prototype, {
		insertTable: function(tb)
		{
			if(this.name != null)
			{				
				this.set.push(tb);
				localStorage.setItem(this.name, JSON.stringify(this));
			}
		},
		selectTable: function(tb_name)
		{
			for(var se = 0; se< this.set.length; se++)
			{
				if(this.set[se].name == tb_name)
				{
					return this.set[se];
				}
			}
		},
		dropTable: function(tb_name)
		{
			for(var se = 0; se< this.set.length; se++)
			{
				if(this.set[se].name == tb_name)
				{
					this.set.splice(se,1);
					
					localStorage.setItem(this.name, JSON.stringify(this));
				}
			}
		},
		size: function()
		{
			return this.set.length;
		}
	});
	//-------------------------------------------GETSTORAGE----------------------------------
	function getStorage(name)
	{
		this.get = JSON.parse(localStorage.getItem(name));
		
		if(this.get)
		{
			console.log("Storage opened.");
		}
		else
		{
			console.log("The storage "+name+" doesn't exist.");
		}
	}
	Object.assign( getStorage.prototype, {
		insertTable: function(tb)
		{
			if(this.get.name != null)
			{				
				this.get.set.push(tb);
				localStorage.setItem(this.get.name, JSON.stringify(this.get));
			}
		},
		selectTable: function(tb_name)
		{
			for(var se = 0; se< this.get.set.length; se++)
			{
				if(this.get.set[se].name == tb_name)
				{
					return this.get.set[se];
				}
			}
		},
		dropTable: function(tb_name)
		{
			for(var se = 0; se< this.get.set.length; se++)
			{
				if(this.get.set[se].name == tb_name)
				{
					this.get.set.splice(se,1);
					
					localStorage.setItem(this.get.name, JSON.stringify(this.get));
				}
			}
		},
		size: function()
		{
			return this.get.set.length;
		}
	});
	
	
	exports.Table = Table;
	exports.Storage = Storage;
	exports.getStorage = getStorage;

	Object.defineProperty(exports, '__esModule', { value: true });

})));