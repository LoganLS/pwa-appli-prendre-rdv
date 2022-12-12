import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

interface EventDate {
    startAt: string,
    endAt: string,
}

export function createFile(startAt: string, description: string) {
    const endAt = new Date(startAt)
    endAt.setTime(endAt.getTime() + 30*60*1000);
    const eventDate: EventDate = {
        startAt: startAt,
        endAt: endAt.toISOString(),
    },
    summary = 'RDV médecin'
    description = description
    return makeIcsFile(eventDate, summary, description);
}

function convertDate(date: string): string
{
    let event: any = new Date(date).toISOString()
    event = event.split("T")[0]
    event = event.split("-")
    event = event.join("")
    return event
}

function makeIcsFile(eventDate: EventDate, summary: string, description: string) {
    const data =
      "BEGIN:VCALENDAR\n" +
      "CALSCALE:GREGORIAN\n" +
      "METHOD:PUBLISH\n" +
      "PRODID:-//Test Cal//EN\n" +
      "VERSION:2.0\n" +
      "BEGIN:VEVENT\n" +
      "UID:test-1\n" +
      "DTSTART;VALUE=DATE:" +
      convertDate(eventDate.startAt) +
      "\n" +
      "DTEND;VALUE=DATE:" +
      convertDate(eventDate.endAt) +
      "\n" +
      "SUMMARY:" +
      summary +
      "\n" +
      "DESCRIPTION:" +
      description +
      "\n" +
      "END:VEVENT\n" +
      "END:VCALENDAR"

    const fileName = makeid(10) + '.ics';
    const file = new File([data], fileName, { type: 'text/calendar' })
    //window.open( "data:text/calendar;charset=utf8,", escape(data));
    return createFileInStorage(file, fileName)
    //return window.URL.createObjectURL(file)
}

function makeid(length: number) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result;
}

function createFileInStorage(file: File, fileName: string) {
    const storage = getStorage()
    const storageRef = ref(storage, fileName)
    return uploadBytes(storageRef, file)
}