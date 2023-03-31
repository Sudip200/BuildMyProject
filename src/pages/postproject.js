import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function UserDashboard() {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectSubcategory, setProjectSubcategory] = useState("");
  const [budget, setBudget] = useState("");

  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/");
    }
  }, [auth.currentUser, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    const uid = auth.currentUser.uid;
    const projectData = {
      projectTitle,
      projectDescription,
      projectCategory,
      projectSubcategory,
      budget,
      createdAt: serverTimestamp(),
      uid
    };
    try {
      await addDoc(collection(db, "allProjects"), projectData);
      alert("Project added successfully!");
      setProjectTitle("");
      setProjectDescription("");
      setProjectCategory("");
      setProjectSubcategory("");
      setBudget("");
    } catch (err) {
      console.log(err);
      alert("Error adding project.");
    }
  };

  return (
    <>
      <Head>
        <title>User Dashboard</title>
        <meta name="description" content="User dashboard for adding projects." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          label {
            margin-top: 1rem;
          }
          input[type="text"], input[type="number"], input[type="submit"] {
            margin-top: 0.5rem;
            padding: 0.5rem;
            border: none;
            border-radius: 0.25rem;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
            font-size: 1rem;
          }
          input[type="submit"] {
            background-color: #4caf50;
            color: #fff;
            cursor: pointer;
          }
        `}</style>
      </Head>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Project title:
            <input
              type="text"
              placeholder="Enter project title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
          </label>
          <label>
            Project description:
            <input
              type="text"
              placeholder="Enter project description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </label>
          <label>
            Project category:
            <input
              type="text"
              placeholder="Enter project category"
              value={projectCategory}
              onChange={(e) => setProjectCategory(e.target.value)}
            />
          </label>
          <label>
            Project subcategory:
            <input
              type="text"
              placeholder="Enter project subcategory"
              value={projectSubcategory}
              onChange={(e) => setProjectSubcategory(e.target.value)}
              />
              </label>
              <label>
              Budget:
              <input
              type="number"
              placeholder="Enter budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              />
              </label>
              <input type="submit" value="Submit" />
              </form>
              </div>
              </>
              );
              }
              
              export async function getServerSideProps({ query }) {
              // Here you can add any server-side code you need
              return { props: {} };
              }
              
              
              
              
              
              
