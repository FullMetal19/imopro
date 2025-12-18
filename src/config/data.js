const vector = {

    listCountry : [
               { name : 'Senegal', content: 'Sénégal' },
               { name : 'Gambie', content: 'Gambie' },
               { name : 'Mali', content: 'Mali' },
               { name : 'Mauritanie', content: 'Mauritanie' },
               { name : 'Guinee Conakry', content: 'Guinée Conakry' },
               { name : 'Guinee Bissau', content: 'Guinée Bissau' }
            ],


    listRegion :   [ 
        
               {  country : 'Senegal', 
                  region : [
                                { name : 'Dakar', content: 'Dakar' },
                                { name : 'Thies', content: 'Thies' },
                                { name : 'Fatick', content: 'Fatick' },
                                { name : 'Kaolack', content: 'Kaolack' },
                                { name : 'Kaffrine', content: 'Kaffrine' },
                                { name : 'Tambacounda', content: 'Tambacounda' },
                                { name : 'Matam', content: 'Matam' },
                                { name : 'Saint Louis', content: 'Saint Louis' },
                                { name : 'Diourbel', content: 'Diourbel' },
                                { name : 'Louga', content: 'Louga' },
                                { name : 'Kedougou', content: 'Kédougou' },
                                { name : 'Kolda', content: 'Kolda' },
                                { name : 'Ziguinchor', content: 'Ziguinchor' },
                                { name : 'Sedhiou', content: 'Sédhiou' } 
                            ]
                },
                {
                   country : 'Gambie', 
                   region : [
                       { name : 'Banjul', content: 'Banjul' },
                       { name : 'Niany', content: 'Niany' },
                   ]
                }

            ],


    propertyType : [

               { name : 'Logement', content: 'Logement' },
               { name : 'Terrain', content: 'Terrain' },
            ],
        

    listOfFieldType :   [ 

               {  type : 'Logement', 
                  subType : [
                                { name : 'Maison', content: 'Maison' },
                                { name : 'Appartement', content: 'Appartement' },
                                { name : 'Studio', content: 'Studio' },
                                { name : 'Chambre', content: 'Chambre' },
                                { name : 'Autres-logements', content: 'Autres' },
                            ]
                },
                {  type : 'Terrain', 
                   subType : [
                                { name : 'Deliberation', content: 'Avec délibération' },
                                { name : 'Bail', content: 'Avec bail' },
                                { name : 'Autres-terrains', content: 'Autres' },
                            ]
                },
                {  type : 'Commerciale', 
                   subType : [
                                { name : 'Bureau', content: 'Bureau' },
                                { name : 'Salle-ceremonie', content: 'Salle cérémonie' },
                                { name : 'Salle-co-working', content: 'Salle co-working' },
                                { name : 'Boutique', content: 'Boutique' },
                                { name : 'Autres-locales', content: 'Autres' },
                            ]
                },

            ],        

            
    contact  :  [
                    {
                        'image' : '../img/icons8-nouveau-message-90.png',
                        'tel1' : 'Contact fix',
                        'tel2' : '+221 33 888 70 62'
                    },
                    {
                        'image' : '../img/icons8-nouveau-message-90.png',
                        'tel1' : 'Contact email',
                        'tel2' : 'contact@diwaneplus.com'
                    },
                    {
                        'image' : '../img/icons8-nouveau-message-90.png',
                        'tel1' : 'Contact',
                        'tel2' : '+221 78 534 26 26',
                    },   
                ],

    phoneIndex  : [  '+221', '+41', '+37'
                    // { 'index' : '+221' },
                    // { 'index' : '+41' },
                    // { 'index' : '+37' },
    ]
    
    }
    
    export default vector;
    