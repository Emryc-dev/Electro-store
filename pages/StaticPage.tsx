import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface StaticPageProps {
  title: string;
  type: 'about' | 'contact' | 'faq' | 'privacy' | 'terms';
}

export const StaticPage: React.FC<StaticPageProps> = ({ title, type }) => {
  const renderContent = () => {
    switch (type) {
      case 'about':
        return (
          <>
            <p className="mb-4">Fondé en 2023, Electro Store est rapidement devenu un leader dans la vente en ligne de produits électroniques. Notre mission est simple : rendre la technologie accessible à tous, avec un service irréprochable.</p>
            <p>Nous sélectionnons rigoureusement nos produits parmi les plus grandes marques mondiales pour vous garantir qualité et fiabilité.</p>
          </>
        );
      case 'contact':
        return (
          <>
            <p className="mb-4">Notre équipe est à votre écoute 24/7.</p>
            <ul className="space-y-2 mb-6">
              <li><strong>Email:</strong> support@electro.com</li>
              <li><strong>Téléphone:</strong> +237 692314218</li>
              <li><strong>Adresse:</strong> 123 Rue Principale, Abidjan, Côte d'Ivoire</li>
            </ul>
            <p>N'hésitez pas à utiliser le ChatBot en bas à droite pour une réponse immédiate !</p>
          </>
        );
      case 'faq':
        return (
          <div className="space-y-4">
            <details className="bg-gray-50 p-4 rounded-lg">
              <summary className="font-bold cursor-pointer">Quels sont les délais de livraison ?</summary>
              <p className="mt-2 text-sm text-gray-600">Nous livrons généralement sous 24 à 48 heures dans les grandes villes.</p>
            </details>
            <details className="bg-gray-50 p-4 rounded-lg">
              <summary className="font-bold cursor-pointer">Puis-je retourner un produit ?</summary>
              <p className="mt-2 text-sm text-gray-600">Oui, vous disposez de 30 jours pour changer d'avis si le produit est dans son emballage d'origine.</p>
            </details>
            <details className="bg-gray-50 p-4 rounded-lg">
              <summary className="font-bold cursor-pointer">Quels moyens de paiement acceptez-vous ?</summary>
              <p className="mt-2 text-sm text-gray-600">Nous acceptons Orange Money, MTN Money et les cartes bancaires Visa/Mastercard.</p>
            </details>
          </div>
        );
      default:
        return <p>Contenu en cours de rédaction. Merci de votre compréhension.</p>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors">
        <ArrowLeft size={18} /> Retour à l'accueil
      </Link>
      
      <motion.div
        {...{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 }
        } as any}
      >
        <h1 className="text-4xl font-bold mb-8 pb-4 border-b border-gray-100">{title}</h1>
        <div className="prose prose-lg text-gray-600">
          {renderContent()}
        </div>
      </motion.div>
    </div>
  );
};