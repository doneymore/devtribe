import { AboutSection } from "@/app/component/reusable/aboutUs/contact";
import { HeroSection } from "@/app/component/reusable/aboutUs/hero";
import WhoWeAreSection from "@/app/component/reusable/aboutUs/info";
import TeamSection from "@/app/component/reusable/aboutUs/teamMembers";
import WhereWeAreHeadedSection from "@/app/component/reusable/aboutUs/whereWe";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen">
      <WhoWeAreSection />
      <WhereWeAreHeadedSection />
      <TeamSection />
      {/* <HeroSection
        imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=485&h=441&fit=crop"
        imageAlt="Professional in business attire"
        logoSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Microsoft_logo.svg/80px-Microsoft_logo.svg.png"
        quote="Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis Aute Irure"
      /> */}

      {/* You can reuse the component multiple times */}
      {/* <AboutSection
        title="About Us"
        mainText="But I Must Explain To You How All This Mistaken Idea Of Denouncing Pleasure And Praising Pain Was Born And I Will Give You A Complete Account Of The System, And Expound The Actual Teachings Of The Great Explorer Of The Truth, The Master-Builder Of Human Happiness. No One Rejects, Dislikes, Or Avoids Pleasure Itself, Because It Is Pleasure, But Because Those Who Do Not Know How To Pursue Pleasure Rationally Encounter Consequences That Are Extremely Painful. Nor Again Is There Anyone Who Loves Or Pursues Or Desires To Obtain Pain Of Itself, Because It Is Pain"
        sections={[
          {
            heading:
              'Section 1.10.33 Of "De Finibus Bonorum Et Malorum", Written By Cicero In 45 BC',
            content:
              "At Vero Eos Et Accusamus Et Iusto Odio Dignissimos Ducimus Qui Blanditiis Praesentium Voluptatum Deleniti Atque Corrupti Quos Dolores Et Quas Molestias Excepturi Sint Occaecati Cupiditate Non Provident, Similique Sunt In Culpa Qui Officia Deserunt Mollitia Animi, Id Est Laborum Et Dolorum Fuga. Et Harum Quidem Rerum Facilis Est Et Expedita Distinctio. Nam Libero Tempore, Cum Soluta Nobis Est Eligendi Optio Cumque Nihil Impedit Quo Minus Id Quod Maxime Placeat Facere Possimus, Omnis Voluptas Assumenda Est, Omnis Dolor Repellendus. Temporibus Autem Quibusdam Et Aut Officiis Debitis Aut Rerum Necessitatibus Saepe Eveniet Ut Et Voluptates Repudiandae Sint Et Molestiae Non Recusandae. Itaque Earum Rerum Hic Tenetur A Sapiente Delectus, Ut Aut Reiciendis Voluptatibus Maiores Alias Consequatur Aut Perferendis Doloribus Asperiores Repellat.",
          },
          {
            heading: "1914 Translation By H. Rackham",
            content:
              "On The Other Hand, We Denounce With Righteous Indignation And Dislike Men Who Are So Beguiled And Demoralized By The Charms Of Pleasure Of The Moment, So Blinded By Desire, That They Cannot Foresee The Pain And Trouble That Are Bound To Ensue; And Equal Blame Belongs To Those Who Fail In Theirduty Through Weakness Of Will, Which Is The Same As Saying Through Shrinking From Toil And Pain. These Cases Are Perfectly Simple And Easy To Distinguish. In A Free Hour, When Our Power Of Choice Is Untrammelled And When Nothing Prevents Our Being Able To Do What We Like Best, Every Pleasure Is To Be Welcomed And Every Pain Avoided. But In Certain Circumstances And Owing To The Claims Of Duty Or The Obligations Of Business It Will Frequently Occur That Pleasures Have To Be Repudiated And Annoyances Accepted. The Wise Man Therefore Always Holds In These Matters To This Principle Of Selection: He Rejects Pleasures To Secure Other Greater Pleasures, Or Else He Endures Pains To Avoid Worse Pains.",
          },
        ]}
      /> */}
    </div>
  );
};

export default AboutUsPage;
