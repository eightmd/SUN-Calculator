class Rezultat extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            show: 0,
            campuri: this.props.campuri
        }
        
        var multipluAparatura = 0;
      var valoareAparatura = 0;
       
        
        
    }
    
    componentWillMount(){
        
    }
    
    componentDidUpdate(){
       
    }
    
    
    
    
    render() {
        var procentaj = Number(this.props.aparatura);
        var multipluAparatura = this.props.aparatura / 100;
        var valoareAparatura = this.props.rezultat * multipluAparatura;
        var grandTotal = this.props.rezultat + valoareAparatura;
        return (
            
            <div>
                {this.props.show ? (
                    <div>
                        <p>Rezultatul: </p>
                        
                        <table className="tabel-rezultate">
                            <tbody>
                            {this.state.campuri.map(function(camp, index){
                                if(camp.denumire == ''){
                                    camp.denumire = 'nedefinit';
                                }

                                if(camp.suma){
                                    var suma = camp.suma;
                                    
                                    return (
                                        <tr className="rezultat--camp">
                                            <td className="rezultat--camp--denumire">{camp.denumire}</td>
                                            <td className="rezultat--camp-suma">{Number(suma).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') } lei</td>
                                        </tr>

                                    )
                                }  
                            })
                            }
                            <tr className="bold">
                                <td>Total Non-aparatura:</td>
                                <td>{this.props.rezultat.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') } lei</td>
                            </tr>
                            <tr>
                                <td>Procentaj aparatura</td>
                                <td>{procentaj.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') }%</td>
                            </tr>
                            <tr className="bold">
                                <td>Valoare Aparatura:</td>
                                <td>{valoareAparatura.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') } lei</td>
                            </tr>
                            <tr className="bold">
                                <td>Grand Total:</td>
                                <td>{grandTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') } lei</td>
                            </tr>
                            
                            
                            </tbody>
                        </table>
                        
                    </div>
                ) : (
                    <p>Nimic inca</p>
                )}
            </div>
        
        )
        
    }
    
}


class Input extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            denumire: this.props.denumire,
            suma: this.props.suma
        }
        
        this.changeSuma = this.changeSuma.bind(this);
        this.changeDenumire = this.changeDenumire.bind(this);
        this.key = this.props.reactKey;
    }
    
    
    changeSuma(event){
        this.props.onUpdate(this.key, 'suma', event.target.value);
    }
    
    changeDenumire(event){
         this.props.onUpdate(this.key, 'denumire', event.target.value);
    }
    
    render() {
        
        return(
            
             <div className="form-group">
               <div className="row">
                   <div className="col-md-4">
                       <label htmlFor="">Denumire</label>
                        <input type="text" defaultValue={this.state.denumire} onChange={this.changeDenumire} /> 
                   </div>
                    <div className="col-md-4">
                       <label htmlFor="">Suma</label>
                        <input type="text" placeholder={this.state.suma} onChange={this.changeSuma} />
                   </div>
               </div>
               <hr></hr>
            </div>
        
        
        )
       
    }
}

class Aparatura extends React.Component {
    constructor(props){
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.props.onUpdate(event.target.value)
        
    }
    
    render() {
        
        return(
        
            <div className="form-group">
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="">Procentaj aparatura*</label>
                        <input type="text" defaultValue={100} onChange={this.handleChange}></input>
                    </div>
                     
                </div>        
                <p>*Procentajul aparaturii din totalul celorlalte. Ex: Un procentaj de 100% inseamna ca aparatura va avea aceeasi valoare ca totalul celorlalte. 200% inseamna ca aparatura va avea un buget de doua ori mai mare decat celelalte.</p>
            </div>
            
        )
        
    }
}

class Equipment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            campuri: [
                {"denumire": "Angajati", "suma": "ex: 54.794"},
                {"denumire": "Consultant", "suma": "ex: 8.000"}
            ],
            aparatura: 100,
            rezultat: 0
        };
        
        this.calculeaza = this.calculeaza.bind(this);
        this.update = this.update.bind(this);
        this.addRow = this.addRow.bind(this);
        this.updateAparatura = this.updateAparatura.bind(this);
    }
    
    calculeaza(){
        
        let x = 0;
        x = Number(x);
        this.state.campuri.map(function(camp, index){
            x = x + Number(camp.suma);
        })
        
        this.setState({
           rezultat: x
        });
        
        
    }
    
  
    
    update(index, field, value){
        /*
        console.log('updated the input with index', index);
        console.log('the field is', field);
        console.log('the value is', value);
        */
        var campuri = this.state.campuri;
        campuri[index][field] = value;
    }
    
    addRow(){
        var campuri = this.state.campuri;
        var campuri = campuri.push({"denumire": "", "suma": "suma"});

       this.forceUpdate();
        
    }
    
    updateAparatura(val){
        this.setState({
           aparatura: val 
        });
    }
    
    componentDidMount(){
        /*
        console.log('equipment rendered');
        */
    }
    
    render() {
     
        return (
            <div className="calc-section">
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                
                {this.state.campuri.map(function(camp, index){
                    return (
                        <Input denumire={camp.denumire} suma={camp.suma} key={index} reactKey={index} onUpdate={this.update} />
                    )
                }, this)
                }
                
                <Aparatura onUpdate={this.updateAparatura} />
                <button onClick={this.calculeaza} >Calculeaza</button>
                <button onClick={this.addRow} >Adauga Element</button>
                
                <Rezultat show={this.state.rezultat} rezultat={this.state.rezultat} campuri={this.state.campuri} aparatura={this.state.aparatura} />
            </div>    
        )
    }   
}



module.exports = Equipment; 