import { Link, Outlet } from "react-router-dom";
 

function Layout() {
  
  

  return (
    
    <div className="app">
      <header className="navbar">
        <Link to="/" className="brand">🌿 Mini Plant Store</Link>
        <nav>
        <Link to="/">Catalog</Link>
      
            <Link to="/admin/add-plant">admin</Link>
           
          
      
      </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
