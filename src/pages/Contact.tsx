import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
      isValid = false;
    }

    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập nội dung tư vấn';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Giả lập gửi form thành công
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Xóa lỗi khi người dùng bắt đầu gõ
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-black min-h-screen text-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">Liên hệ</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Kết nối với LuxeAuto</h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn tìm kiếm chiếc xe mơ ước.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-zinc-900 p-3 rounded-full border border-white/10 shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-2">Địa chỉ</h3>
                  <p className="text-gray-400 font-light leading-relaxed">
                    123 Đường Nguyễn Văn Linh<br />
                    Quận 7, TP. Hồ Chí Minh<br />
                    Việt Nam
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-zinc-900 p-3 rounded-full border border-white/10 shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-2">Hotline</h3>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Tư vấn bán hàng:<br />
                    <a href="tel:19001234" className="text-white hover:underline">1900 1234</a><br />
                    Hỗ trợ kỹ thuật:<br />
                    <a href="tel:19005678" className="text-white hover:underline">1900 5678</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-zinc-900 p-3 rounded-full border border-white/10 shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-2">Email</h3>
                  <p className="text-gray-400 font-light leading-relaxed">
                    <a href="mailto:info@luxeauto.vn" className="hover:text-white transition-colors">info@luxeauto.vn</a><br />
                    <a href="mailto:support@luxeauto.vn" className="hover:text-white transition-colors">support@luxeauto.vn</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-zinc-900 p-3 rounded-full border border-white/10 shrink-0">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-2">Giờ làm việc</h3>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Thứ 2 - Thứ 6: 08:00 - 18:00<br />
                    Thứ 7 - CN: 09:00 - 17:00
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps iframe */}
            <div className="w-full h-80 rounded-2xl overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669658423711!2d106.66627331533434!3d10.75992006243916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9251cb4cdaf1523!2sHo%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1625555555555!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-900 border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold mb-8 uppercase tracking-wider">Gửi yêu cầu tư vấn</h2>
            
            {isSubmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-400 p-6 rounded-xl mb-8">
                <h3 className="text-xl font-bold mb-2">Cảm ơn bạn!</h3>
                <p>Yêu cầu tư vấn của bạn đã được gửi thành công. Đội ngũ LuxeAuto sẽ liên hệ lại trong thời gian sớm nhất.</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Họ và tên *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-black border ${errors.name ? 'border-red-500' : 'border-white/20'} rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/50 transition-colors`}
                  placeholder="Nhập họ tên của bạn"
                />
                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Số điện thoại *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-black border ${errors.phone ? 'border-red-500' : 'border-white/20'} rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/50 transition-colors`}
                  placeholder="Nhập số điện thoại"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Nội dung tư vấn *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full bg-black border ${errors.message ? 'border-red-500' : 'border-white/20'} rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/50 transition-colors resize-none`}
                  placeholder="Bạn quan tâm đến mẫu xe nào? Hãy để lại lời nhắn..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-white hover:bg-gray-200 transition-colors rounded-xl group uppercase tracking-wider"
              >
                Gửi yêu cầu
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
