import { useState } from "react";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import type { FoodData } from "../../interface/FoodData";
import "./modal.css";

interface InputProps {
  label: string;
  value: string | number;
  placeholder?: string;
  type?: string;
  updateValue(value: any): void;
}

interface CreateModalProps {
  closeModal?: () => void;
}

const Input = ({
  label,
  value,
  placeholder,
  type = "text",
  updateValue,
}: InputProps) => {
  const inputId = `field-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="input-group">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          updateValue(type === "number" ? Number(e.target.value) : e.target.value)
        }
      />
    </div>
  );
};

export function CreateModal({ closeModal }: CreateModalProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const { mutate } = useFoodDataMutate();

  const submit = () => {
    const foodData: FoodData = {
      title,
      price,
      image,
    };
    mutate(foodData);
    closeModal?.();
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          closeModal?.();
        }
      }}
    >
      <div className="modal-card" role="dialog" aria-modal="true">
        <div className="modal-header">
          <div>
            <h2>Cadastre um novo item no Cardápio</h2>
            <p className="modal-subtitle">
              Preencha os dados para adicionar ao menu.
            </p>
          </div>
          {closeModal && (
            <button
              type="button"
              className="modal-close"
              onClick={closeModal}
              aria-label="Fechar modal"
            >
              ✕
            </button>
          )}
        </div>

        <form
          className="input-container"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <Input
            label="Título"
            placeholder="Ex: Hambúrguer Artesanal"
            value={title}
            updateValue={setTitle}
          />
          <Input
            label="Preço"
            type="number"
            placeholder="0"
            value={price}
            updateValue={setPrice}
          />
          <Input
            label="Imagem (URL ou caminho)"
            placeholder="Ex: /images/burger.jpg"
            value={image}
            updateValue={setImage}
          />

          <div className="modal-actions">
            <button type="submit" className="buttonSecondary">
              Postar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}