import Community from "./../models/Community.model";

const community = new Community();

const result = async () => {
    community.create({
        name: "Neeraj3",
        created_by: "Neeraj",
        description: "First Community created succesfully",
        privacy_status: "Public",
    })
}

export default result