import architecture from "../../assets/architecture.png";
import { useGetUserQuery } from "../../app/apiSlice";
import { CertificationDisplay } from "../certifications/CertificationDisplay";
import { LetterIcon } from "../../common/svg";
<div className="" />;

export const About = () => {
  const { data } = useGetUserQuery("rickycheah1990");

  return (
    <div className="flex flex-col m-3 items-center">
      <h3 className="m-2 font-semibold">Contact</h3>
      <section className="flex flex-col items-center max-w-screen-lg">
        <p className="m-2">
          For now, this about page will showcase the architectural design of the
          website. However, in the future, all of this content will be
          transitioned to a dedicated Blog section. If you have any suggestions
          or would like to report any bugs, please feel free to reach out to me!
        </p>

        <div className="w-fit flex flex-col">
          <a
            className=" m-3 p-1.5 bg-white button-hover-shadow button-outline flex space-x-2"
            href="mailto: rickyclk15@gmail.com"
          >
            <span className="w-5 h-5">
              <LetterIcon />
            </span>
            <div>rickyclk15@gmail.com</div>
          </a>
        </div>
      </section>
      <hr className="my-4 h-px w-9/12 border-gray-500" />
      <h3 className="m-2 font-semibold">
        Architecture Diagram of Cloudpractitioners.com
      </h3>
      <figure className="flex flex-col w-3/5">
        <img
          className="object-scale-down border-black border-2"
          src={architecture}
          alt="AWS Architecture Diagram"
        ></img>
        <figcaption className="flex justify-center text-sm">
          Architecture Diagram created at visual-paradigm.com
        </figcaption>
      </figure>
      <hr className="my-4 h-px w-9/12 border-gray-500" />

      <h3 className="m-2 font-semibold">Objective and Design Rationale</h3>
      <section className="max-w-screen-lg">
        <p className="m-2">
          The objective of the project was to create a vibrant platform that
          fosters user connection, networking, and inspiration through shared
          experiences. Additionally, I thought it would be interesting to
          explore the geographical distribution of cloud practitioners.
        </p>
        <p className="m-2">
          Deploying CloudFront in front of API Gateway aims to reduce latency by
          leveraging AWS' network. After conducting an HTTPS handshake at one of
          CloudFront's Points of Presence (PoPs), user requests would travel
          within AWS' network, potentially improving response times.
        </p>
        <p className="m-2">
          Choosing DynamoDB as the main database over Amazon RDS brought certain
          advantages, such as a flexible schema and ease of iteration. It's
          worth noting that ACID compliance, which NoSQL databases lack, was not
          considered crucial for this project.
        </p>
        <p className="m-2">
          GitHub Actions were utilized for handling CI/CD, while a variety of
          AWS services powered the remaining aspects of the project. Initially,
          the plan was to deploy the project as a Django application on EC2 with
          Docker. However, a more captivating idea emerged, leading to a
          decision to go completely serverless. This involved replacing Django
          with Lambda, API Gateway, and Cognito. This shift not only allowed for
          the incorporation of additional AWS services but also ensured that the
          time spent to get my certifications would not go to waste &#128526;.
        </p>
      </section>
      <h3 className="m-2 font-semibold mt-5">My AWS Certifications</h3>
      <section className="m-2 w-5/6">
        {data && (
          <div className="mb-3 mx-4">
            <CertificationDisplay
              viewingUser={false}
              ownProfile={false}
              showType={true}
              certificationArray={data.slice(1)}
            />
            <div className="text-sm justify-center flex">
              A React reusable component!
            </div>
          </div>
        )}
      </section>
      <h3 className="font-semibold mt-5">Challenges</h3>
      <section className="mt-1 max-w-screen-lg">
        <p className="m-2">
          Undoubtedly, incorporating all these AWS services for my first cloud
          project proved to be ambitious. The implementation of an
          authentication system using Cognito, API Gateway, and Lambda, while
          managing JWT Tokens and HttpOnly Cookies, presented its own set of
          difficulties. Another puzzle was to implement the correct CORS headers
          in the correct AWS service! Ultimately, the experience gained from
          searching through <span className="italic"> obscure</span> Stack
          Overflow posts proved to be invaluable in terms of practical learning.
        </p>
      </section>
      <h3 className="font-semibold mt-5">Next Steps</h3>
      <section className="mt-1 max-w-screen-lg">
        <p className="m-2">
          Currently, the website only showcases users' LinkedIn pages for
          networking purposes. The next milestone is to introduce a message
          board that facilitates discussions on study materials, certification
          test intricacies, and other relevant topics.
        </p>
        <br></br>
      </section>
    </div>
  );
};
