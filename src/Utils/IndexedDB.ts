import { EventInterface } from "../Interfaces/events.interface";

const DB_NAME = "event_calender";
const DB_VERSION = 1;
const STORE_NAME = "events";

class IndexedDB {
  db: IDBDatabase | null = null;

  constructor() {
    this.initDB();
  }

  private initDB(): void {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = (event: Event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
    };

    request.onerror = (event: Event) => {
      console.error("Error opening indexedDB:", (event.target as IDBOpenDBRequest).error);
    };
  }

  // Add new data to the database
  public async addData(data: Partial<EventInterface>): Promise<void> {
    const transaction = this.db?.transaction([STORE_NAME], "readwrite");
    const store = transaction?.objectStore(STORE_NAME);
    store?.add(data);
    console.log('added')
  }
  
  // Retrieve all data from the database
  public async getAllData(): Promise<EventInterface[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction([STORE_NAME], "readonly");
      const store = transaction?.objectStore(STORE_NAME);
      const request = store?.getAll();
      if(request) {
        request.onsuccess = () => {
            resolve(request.result);
          };
    
          request.onerror = () => {
            reject("Error getting data:");
          };
      } else {
        resolve([])
      }
      
    });
  }
}

export default new IndexedDB();
