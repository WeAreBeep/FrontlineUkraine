To Generate a DB Context from scratch: 
======================================

```
Scaffold-DbContext Microsoft.EntityFrameworkCore.SqlServer -Connection 'name=DataContext' -OutputDir 'Db'  -Context 'DataContext'
```

Regenerate Exisiting DbContext 
==============================
To Generate a DB Context to an **alternative folder**, overwritting anything already there, so provide generated code that can be compared for differences to be selected for inclusion in a piecemeal fashion: 

```
Scaffold-DbContext Microsoft.EntityFrameworkCore.SqlServer -Connection 'name=DataContext' -OutputDir 'Db2'  -Context 'DataContext' -Force
```

Once done with the above Db2 folder - simply delete the folder and it's contents