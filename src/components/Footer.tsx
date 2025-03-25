
import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, FacebookIcon, TwitterIcon, InstagramIcon, Droplet } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black/40 border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 font-heading text-2xl font-bold text-blood-600 mb-4"
            >
              <div className="w-8 h-8 rounded-full bg-blood-500 flex items-center justify-center text-white font-bold">
                B+
              </div>
              <span>BloodCircle</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Connecting blood donors with those in need, saving lives one donation at a time.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-blood-500 hover:text-white transition-colors"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-blood-500 hover:text-white transition-colors"
              >
                <TwitterIcon size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-blood-500 hover:text-white transition-colors"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-blood-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-blood-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-blood-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-blood-500 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-blood-500 transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Blood Types</h3>
            <div className="grid grid-cols-2 gap-2">
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-blood-500" fill="currentColor" />
                  <span>{type}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin size={18} className="text-blood-500" />
                <span>123 Main Street, City, Country</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} className="text-blood-500" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} className="text-blood-500" />
                <span>info@bloodcircle.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 text-center text-muted-foreground text-sm">
          <p className="flex items-center justify-center gap-1">
            &copy; {currentYear} BloodCircle. Made with <Heart size={14} className="text-blood-500 fill-blood-500" /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
