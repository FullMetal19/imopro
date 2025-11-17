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
import { ValidatingCompany } from './views/admin/company/ValidatingCompany';
import { BlockedCompany } from './views/admin/company/BlockedCompany';
import { ValidateCompany } from './views/admin/company/ValidateCompany';
import { Companies } from './views/admin/company/Companies';
import { Withdraws } from './views/admin/company/Withdraws';
import { Stat } from './views/admin/company/Stat';
import { Services } from './views/admin/service/Services';
import { Notifications } from './views/admin/notification/Notifications';
import { Users } from './views/admin/user/Users';
import { ValidatingProperty } from './views/admin/genrality/ValidatingProperty';
import { UnvalidatedProperties } from './views/admin/genrality/UnvalidatedProperties';
import { Configurations } from './views/admin/genrality/Configurations';
import { MoreDetails } from './views/admin/genrality/MoreDetails';
import { Error } from './views/Error';
import TermsOfUse from './views/TermsOfUse';

function App() {
  return (

      <div className="App">
       
        <BrowserRouter>
            <Routes>

                <Route exact path="/" element={ <Home /> }> </Route>
                <Route exact path="/service" element={ <Service /> }> </Route>
                <Route exact path="/contact" element={ <Contact /> }> </Route>
                <Route path="/condition-utilisation" element={ <TermsOfUse />  } ></Route>

                <Route exact path="/logement" element={ <Housing /> }> </Route>
                <Route exact path="/terrain" element={ <Field /> }> </Route>
                <Route exact path="/propriete/:id" element={ <PropertyDetails /> }> </Route>

                <Route exact path="/connexion" element={ <Signin /> }> </Route>
                <Route exact path="/inscription" element={ <Signup /> }> </Route>

                <Route exact path="/validation-compte" element={ <ValidateAccount /> }> </Route>
                <Route exact path="/mot-de-passe-oublie" element={ <Password /> }> </Route>


 

                
                <Route exact path="/mon-compte" element={ <Account /> }> </Route>
                <Route exact path="/mensualites/:housingId" element={ <MonthPay /> }> </Route>
                    
                <Route exact path="/creation-entreprise" element={ <NewCompany /> }> </Route>
                <Route exact path="/modification-entreprise/:companyId" element={ <ModifyCompany /> }> </Route>





                <Route exact path="/entreprise/:companyId" element={ <ValidatedProperty /> }> </Route>
                <Route exact path="/entreprise/:companyId/propriete-invalide" element={ <UnvalidatedProperty /> }> </Route>
                <Route exact path="/entreprise/:companyId/propriete-en-cours" element={ <InprogressProperty /> }> </Route>
                <Route exact path="/entreprise/:companyId/nouvelle-propriete" element={ <AddProperty /> }> </Route>
                <Route exact path="/configuration/:companyId/:propertyId" element={ <Configuration /> }> </Route>

                <Route exact path="/entreprise/:companyId/solde" element={ <Balance /> }> </Route>

                <Route exact path="/entreprise/:companyId/notifications" element={ <Notification /> }> </Route>

                <Route exact path="/entreprise/:companyId/propriete-reserve" element={ <Property /> }> </Route>
                <Route exact path="/mensualites/:companyId/:propertyId" element={ <PaymentsHistoric /> }> </Route>





                <Route exact path="/admin" element={ <ValidatingProperty /> }> </Route>
                <Route exact path="/admin/propriete-invalide" element={ <UnvalidatedProperties /> }> </Route>
                <Route exact path="/admin/configuration/:propertyId" element={ <Configurations /> }> </Route>
                <Route exact path="/admin/details/:propertyId" element={ <MoreDetails /> }> </Route>

                <Route exact path="/admin/services" element={ <Services /> }> </Route>

                <Route exact path="/admin/entreprise" element={ <Companies /> }> </Route>
                    <Route exact path="/admin/retrait/:companyId" element={ <Withdraws /> }> </Route>
                    <Route exact path="/admin/solde/:companyId" element={ <Stat /> }> </Route>
                <Route exact path="/admin/entreprise-en-cours-validation" element={ <ValidatingCompany /> }> </Route>
                    <Route exact path="/admin/entreprise/:companyId" element={ <ValidateCompany /> }> </Route>
                <Route exact path="/admin/entreprise-bloque" element={ <BlockedCompany /> }> </Route>

                <Route exact path="/admin/notification" element={ <Notifications /> }> </Route>
                
                <Route exact path="/admin/parametre" element={ <Users /> }> </Route>
          

    
                <Route path="*" element={ <Error />  } ></Route>

            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
