
import * as Realm from 'realm-web';
const REALM_APP_ID = "application-0-qrgsr";
export const app  = new Realm.App({ id: REALM_APP_ID });
export const credentials = Realm.Credentials.emailPassword("sanjay402@gmail.com","123456");