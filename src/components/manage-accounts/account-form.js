"use client";
import { motion } from "framer-motion";

export default function AccountForm({
  showAccountForm,
  formData,
  setFormData,
  handleSave,
  setShowAccountForm,
}) {
  return (
    showAccountForm && (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex w-[100vw] h-full justify-center items-center fixed top-0 left-0 bg-black/95">
          <div className="px-8 py-8 h-[300px] gap-3 flex flex-col justify-center z-[999] relative">
            {/* <div className="px-8 py-8 h-[300px] fixed top-[10px] gap-3 flex flex-col items-start right-[10px] bg-black opacity-[0.85] z-[999]"> */}
            <button
              className="absolute -top-5 -right-5 text-6xl  rounded-full hover:text-red-500 rotate-45"
              onClick={() => setShowAccountForm(!showAccountForm)}
            >
              +
            </button>
            <div className="flex flex-col gap-5">
              <input
                name="name"
                type="text"
                value={formData["name"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
                placeholder="Enter your name"
                className="px-5 py-3 rounded-md placeholder:text-red-700 text-lg text-black outline-none focus:outline-none"
              />
              <input
                name="pin"
                type="password"
                value={formData["pin"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
                maxLength={4}
                placeholder="Enter 4 digit PIN"
                className="px-5 py-3 rounded-md placeholder:text-red-700 text-lg text-black outline-none focus:outline-none"
              />
              <button
                onClick={handleSave}
                className="border p-3 bg-[#fdcf36] hover:bg-[#f3f032] outline-none rounded-md text-black text-lg font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  );
}
