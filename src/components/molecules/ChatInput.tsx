import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard, Text } from 'react-native';
import { darkTheme } from '../../theme/colors';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  placeholder = "Type your message...",
  disabled = false
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      Keyboard.dismiss();
    }
  };

  const handleSubmitEditing = () => {
    handleSend();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            disabled && styles.disabledInput
          ]}
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder}
          placeholderTextColor={darkTheme.textSecondary}
          multiline
          maxLength={500}
          editable={!disabled}
          onSubmitEditing={handleSubmitEditing}
          blurOnSubmit={false}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.sendButton,
          (!message.trim() || disabled) && styles.disabledButton
        ]}
        onPress={handleSend}
        disabled={!message.trim() || disabled}
      >
        <View style={styles.sendIcon}>
          <Text style={styles.sendButtonText}>➤</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: darkTheme.card,
    borderTopWidth: 1,
    borderTopColor: darkTheme.border,
  },
  inputContainer: {
    flex: 1,
    marginRight: 12,
    minHeight: 44,
  },
  textInput: {
    backgroundColor: darkTheme.border,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: darkTheme.text,
    maxHeight: 100,
    textAlignVertical: 'top',
  },
  disabledInput: {
    backgroundColor: darkTheme.card,
    color: darkTheme.textSecondary,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: darkTheme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: darkTheme.textMuted,
  },
  sendIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: darkTheme.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChatInput;
