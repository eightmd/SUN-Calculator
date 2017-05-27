import Equipment from './components/equipment.jsx';
import Consultant from  './components/consultant.jsx';
import Angajati from  './components/angajati.jsx';
import CashFlow from  './components/cashflow.jsx';

class App extends React.Component {
    render() {
     
        return (
            <div>
                <Equipment> </Equipment>
                <div className="row">
                    <div className="col-sm-6">
                        <Consultant></Consultant>
                    </div>
                    <div className="col-sm-6">
                        <Angajati></Angajati>
                        
                    </div>
                    <div className="col-sm-6">
                        <CashFlow></CashFlow>
                        
                    </div>
                    
                </div> 
               
            </div>
        
        )   
    }   
}
 
module.exports = App; 