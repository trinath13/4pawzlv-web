import { PawPrint, Heart, Shield, Award, Users, Sparkles, Stethoscope, Scissors, GraduationCap } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionTitle from '@/components/SectionTitle';

export default function About() {
  return (
    <>
      <PageHeader
        title="About 4pawzlv"
        subtitle="We believe every pet deserves to be treated with expertise, patience, and love. That is the standard we have held since day one."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
        bgImage="https://images.pexels.com/photos/12301135/pexels-photo-12301135.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6235020/pexels-photo-6235020.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Veterinarian with pet"
                className="rounded-3xl shadow-2xl shadow-primary-900/20 w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary-900 text-white rounded-2xl p-6 shadow-xl hidden sm:block">
                <p className="font-display text-4xl font-bold">2018</p>
                <p className="text-sm text-primary-200">Year founded</p>
              </div>
            </div>
            <div>
              <SectionTitle
                eyebrow="Our Story"
                title="From a small clinic to a full-service pet care home"
              />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  4pawzlv started in 2018 as a single grooming room above a pet supply store. Our founder, a former veterinary technician, saw too many pets receiving rushed, impersonal care — and too many owners left anxious and unsure.
                </p>
                <p>
                  She set out to build something different: a place where pets are calmed before they are treated, where owners are educated rather than upsold, and where every team member is chosen as much for their heart as their credentials.
                </p>
                <p>
                  Today, 4pawzlv is a full-service pet care destination with grooming, veterinary, training, and boarding under one roof — plus a curated shop and subscription plans. We serve over 10,000 pet families and are growing, but our promise has never changed: care that feels like home.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { num: '12k+', label: 'Pets cared for' },
                  { num: '25+', label: 'Expert team' },
                  { num: '4.9', label: 'Average rating' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center bg-cream-50 rounded-xl p-4 border border-primary-100">
                    <p className="font-display text-2xl font-bold text-primary-700">{stat.num}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Our Values"
            title="The principles behind everything we do"
            center
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Compassion First', desc: 'We take the time to understand each pet\'s personality and comfort level before any service begins.' },
              { icon: Shield, title: 'Safety Always', desc: 'Strict hygiene protocols, safe products, and continuous training keep every visit risk-free.' },
              { icon: Award, title: 'Excellence in Craft', desc: 'Our groomers, vets, and trainers hold current certifications and pursue ongoing education.' },
              { icon: Users, title: 'Community Minded', desc: 'We partner with local shelters, offer free monthly consultations, and support rescue events.' },
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-6 border border-primary-100 hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-lg font-semibold text-primary-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Meet the Team"
            title="The people who care for your pets"
            subtitle="Certified, experienced, and endlessly patient — our team is the heart of 4pawzlv."
            center
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Dr. Emily Carter', role: 'Lead Veterinarian', icon: Stethoscope, desc: 'DVM with 12 years in small animal practice. Special interest in dental and preventive care.' },
              { name: 'Marcus Lee', role: 'Master Groomer', icon: Scissors, desc: 'Certified Master Groomer with breed-specific expertise across dogs and cats of all sizes.' },
              { name: 'Sofia Martinez', role: 'Lead Trainer', icon: GraduationCap, desc: 'CPDT-KA certified trainer specializing in positive reinforcement and behavior modification.' },
              { name: 'James Okafor', role: 'Pet Nutritionist', icon: Sparkles, desc: 'Certified animal nutritionist building tailored diet plans for every life stage and need.' },
            ].map((member) => (
              <div key={member.name} className="bg-cream-50 rounded-2xl p-6 border border-primary-100 text-center hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center mx-auto mb-4">
                  <member.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold text-primary-900">{member.name}</h3>
                <p className="text-sm text-primary-600 font-medium mt-0.5">{member.role}</p>
                <p className="text-sm text-gray-500 leading-relaxed mt-3">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission banner */}
      <section className="py-16 bg-gradient-to-br from-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <PawPrint className="absolute top-8 left-12 w-24 h-24 text-white" />
          <PawPrint className="absolute bottom-8 right-12 w-20 h-20 text-white rotate-45" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <PawPrint className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
            "We do not just care for pets. We care for the bond between pets and their people."
          </h2>
          <p className="mt-4 text-primary-200">— Founder, 4pawzlv Pet Care</p>
        </div>
      </section>
    </>
  );
}
