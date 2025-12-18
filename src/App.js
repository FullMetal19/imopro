import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './views/Home';
import { Contact } from './views/Contact';
import { Housing } from './views/Housing';
import { Field } from './views/Field';
import { Service } from './views/Service';
import { PropertyDetails } from './views/PropertyDetails';
import { Signin } from './views/Signin';
import { Signup } from './views/Signup';
import { ValidateAccount } from './views/ValidationAccount';
import { Password } from './views/Password';
import { Account } from './views/user/Account';
import { MonthPay } from './views/user/MonthPay';
import { NewCompany } from './views/user/NewCompany';
import { ModifyCompany } from './views/user/ModifyCompany';
import { ValidatedProperty } from './views/company/genrality/ValidatedProperty';
import { UnvalidatedProperty } from './views/company/genrality/UnvalidatedProperty';
import { InprogressProperty } from './views/company/genrality/InprogressProperty';
import { AddProperty } from './views/company/genrality/AddProperty';
import { Configuration } from './views/company/genrality/Configuration';
import { Balance } from './views/company/balance/Balance';
import { Notification } from './views/company/notification/Notification';
import { Property } from './views/company/property/Property';
import { PaymentsHistoric } from './views/company/property/PaymentsHistoric';
import { Error } from './views/Error';
import TermsOfUse from './views/TermsOfUse';
import ProtectedRoute from './route/ProtectedRoute';
import { Search } from './views/Search';
import { FAQ } from './views/FAQ';

function App() {
  return (

      <div className="App">
       
        <BrowserRouter>
            <Routes>

                <Route exact path="/" element={ <Home /> }> </Route>
                <Route exact path="/service" element={ <Service /> }> </Route>
                <Route exact path="/contact" element={ <Contact /> }> </Route>
                <Route path="/condition-utilisation" element={ <TermsOfUse />  } ></Route>
                <Route exact path="/faq" element={ <FAQ /> }> </Route>

                <Route exact path="/logement" element={ <Housing /> }> </Route>
                <Route exact path="/terrain" element={ <Field /> }> </Route>
                <Route exact path="/search/:type" element={ <Search /> }> </Route>


                <Route exact path="/connexion" element={ <Signin /> }> </Route>
                <Route exact path="/inscription" element={ <Signup /> }> </Route>

                <Route exact path="/validation-compte" element={ <ValidateAccount /> }> </Route>
                <Route exact path="/mot-de-passe-oublie" element={ <Password /> }> </Route>


                {/* Toutes les routes protégées */}
                <Route element={<ProtectedRoute />}>
     
                    <Route exact path="/propriete/:id" element={ <PropertyDetails /> }> </Route>
         
                    <Route exact path="/mon-compte" element={ <Account /> }> </Route>
                    <Route exact path="/mensualites/:housingId" element={ <MonthPay /> }> </Route>
                    
                    <Route exact path="/creation-entreprise" element={ <NewCompany /> }> </Route>
                    <Route exact path="/modification-entreprise/:companyId" element={ <ModifyCompany /> }> </Route>


                    {/* <Route exact path="/search/:type" element={ <Search /> }> </Route> */}

                    
                    <Route exact path="/entreprise/:companyId" element={ <ValidatedProperty /> }> </Route>
                    <Route exact path="/entreprise/:companyId/propriete-invalide" element={ <UnvalidatedProperty /> }> </Route>
                    <Route exact path="/entreprise/:companyId/propriete-en-cours" element={ <InprogressProperty /> }> </Route>
                    <Route exact path="/entreprise/:companyId/nouvelle-propriete" element={ <AddProperty /> }> </Route>
                    <Route exact path="/configuration/:companyId/:propertyId" element={ <Configuration /> }> </Route>

                    <Route exact path="/entreprise/:companyId/solde" element={ <Balance /> }> </Route>

                    <Route exact path="/entreprise/:companyId/notifications" element={ <Notification /> }> </Route>

                    <Route exact path="/entreprise/:companyId/propriete-reserve" element={ <Property /> }> </Route>
                    <Route exact path="/mensualites/:companyId/:propertyId" element={ <PaymentsHistoric /> }> </Route>

                </Route>

    
                <Route path="/404" element={ <Error />  } ></Route>

                <Route path="*" element={ <Error />  } ></Route>
    

            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
