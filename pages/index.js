import React, { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { MongoClient } from "mongodb";

function HomePage(props) {
  return(
    <Fragment>
    <Head>
      <title >React Meetups</title>
      <meta name = 'description'
      content = 'Browse a huge list of highlt active React Mettups!' />
    </Head>
      <MeetupList meetups={props.meetups} />;
  </Fragment>
  );
}

//Which one to use getServer or getStatic ?
//when you don't need req object or data not changing frequently use getStatic
//otherwise use getServerSide

//here we have case2

//This runs for every server side request incoming for so need to run revalidate every 10 seconds
// export async function getServerSideProps(context) {
//   // This will be helpful with session cookie or Authentication purpose
//   const req = context.req;
//   const res = context.res;
//   //fetch data from API or from file system interface
//     return {
//       props : {
//         meetups : DUMMY_MEETUPS
//       },
//     }
// }

// important fun that contains all data which you need while rendering page you need to wait for
export async function getStaticProps() {
  //fetch data api from or from database

  const client = await MongoClient.connect(
    "mongodb+srv://dhruv9596:dhruv9596@cluster0.yyqkxyn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetups) => ({
        title: meetups.title,
        address: meetups.address,
        image: meetups.image,
        id: meetups._id.toString(),
      })),
    },
    revalidate: 10,
    //when data changes too frequently
    // This page is generated at least 10sec at server if req are coming
    //revalidate : 10
  };
}
export default HomePage;
