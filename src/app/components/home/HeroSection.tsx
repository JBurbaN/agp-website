import React from 'react';

export const HeroSection = () => {
  return (
    <section className="relative h-150 flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary/0 mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent z-10"></div>
        <img 
            className="w-full h-full object-cover" 
            alt="Fachada de la Institución Educativa Antonio García Paredes" 
            src="https://scontent.fclo1-4.fna.fbcdn.net/v/t39.30808-6/555538467_10234365192566028_8010241321539104960_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=2a1932&_nc_ohc=LN5aREMpFE8Q7kNvwFaH0E3&_nc_oc=Adk8J_EXH0eyVqCZVbcSn4v0At2WWHZRxFBiy3rWWjbmJPGxZuhYdnfuDcPxDZzN6ts&_nc_zt=23&_nc_ht=scontent.fclo1-4.fna&_nc_gid=1yZS_jlCnW8DtHn1TShRsw&_nc_ss=8&oh=00_Afz9LefsHvs-i2uEbzTJfyBztl0nQtPY-AAVwFtSCYV8LA&oe=69BD807A" 
        />
      </div>
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
            Institución Educativa Antonio García Paredes
          </h1>
          <p className="text-xl text-slate-100 mb-10 leading-relaxed font-medium">
            Formación integral basada en valores, cultura y educación de calidad para la comunidad de Popayán.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary hover:bg-red-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105">
              Conoce nuestra institución
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold py-4 px-8 rounded-lg text-lg transition-all">
              Contáctanos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};