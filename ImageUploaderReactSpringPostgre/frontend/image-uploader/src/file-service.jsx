import service from './service.jsx';

export class FileService {
    uploadFileToServer(data){
        //returns Promise object
        return service.getRestClient().post('/createPerson', data);
    }
}
