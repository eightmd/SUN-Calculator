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
                    <div className="rezultat">
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
                    <p>Nimic inca / Elemente invalide</p>
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
                   <div className="col-xs-6 cold-md-4 column">
                       <label htmlFor="">Denumire</label>
                        <input type="text" className="form-control" defaultValue={this.state.denumire} onChange={this.changeDenumire} /> 
                   </div>
                    <div className="col-xs-6 col-md-4 column">
                       <label htmlFor="">Suma (lei)</label>
                        <input type="text" className="form-control" placeholder={this.state.suma} onChange={this.changeSuma} />
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
                        <input type="text" className="form-control" defaultValue={100} onChange={this.handleChange}></input>
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
               <h3>Calculator buget pentru echipamente si software</h3>
                <p>Conform grilei programului Startup Nation, se acorda un punctaj suplimentar de 10 puncte proiectelor care investesc mai mult de 50% in echipamente tehnologice si aparatura.</p>
                
                <p>Exista situatii in care nu este tocmai indicat sa se contracteze pentru toata suma disponibila (200.000 lei) din motivul costurilor ce trebuie suportate in avans. In acest sens am creat calculatorul ce poate sa va ajute in realizarea calculelor necesare pentru estimarea bugetului.</p>
                
                <p>Pentru obtinerea celor 10 puncte suplimentare trebuie ca procentajul aparaturii (echipamente tehnologice si software) sa fie de minim 100% din totalul celorlalte (adica minim tot atat). </p>
                
                 <button className="btn btn-default" data-toggle="modal" data-target="#myModal" data-theVideo="http://www.youtube.com/embed/loFtozxZG0s" >VIDEO</button> 
                
                {this.state.campuri.map(function(camp, index){
                    return (
                        <Input denumire={camp.denumire} suma={camp.suma} key={index} reactKey={index} onUpdate={this.update} />
                    )
                }, this)
                }
                
                <Aparatura onUpdate={this.updateAparatura} />
                
                
                <button onClick={this.addRow} className="btn" >Adauga Element</button>
                
                <button onClick={this.calculeaza} className="btn" >Calculeaza</button>
                
                <Rezultat show={this.state.rezultat} rezultat={this.state.rezultat} campuri={this.state.campuri} aparatura={this.state.aparatura} />
            </div>    
        )
    }   
}



module.exports = Equipment; 